# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official app for DHBW Villingen-Schwenningen (Android/iOS). Angular 21 + Ionic 8 + Capacitor 8, strict TypeScript, RxJS. UI language is **German** (`LOCALE_ID: 'de-DE'`).

## Commands

- `npm start` — dev server (`ng serve`, port **8100**)
- `npm run build` — dev build to `www/`; production: `npm run build -- --configuration production`
- `npm test` — Jest in watch mode; `npm run test:ci` for a single CI run
- Single test file: `npm test -- --test-path-patterns=<regex>` (Jest 30: the option is `testPathPatterns`, plural); single test: add `--test-name-pattern=<name>`
- `npm run lint` — ESLint + Prettier check; `npm run fmt` — auto-fix both
- `npm run e2e` / `npm run e2e:ci` — Cypress e2e (starts dev server itself); `npm run cypress:open` for interactive
- Native: `npx ionic cap sync android && npx ionic cap run android --open --external -l` (same for `ios`)
- `npm run release` — `commit-and-tag-version`; a postbump hook syncs native version numbers via `@capawesome/capver`

`npm install` requires `CAPAWESOME_NPM_REGISTRY_TOKEN` (private registry for `@capawesome-team/*` in `.npmrc`) and runs `patch-package` (patches in `patches/`). All dependency versions are pinned exactly (`save-exact=true`).

## Architecture

**NgModule-based, not standalone.** `standalone: false` components with constructor DI are the convention — the `prefer-standalone` and `prefer-inject` ESLint rules are deliberately disabled. All components use `OnPush` change detection, SCSS, prefix `app`. Component classes may end in `Component` or `Page`.

Path aliases (never deep relative imports): `@app/*` → `src/app/*`, `@env/*` → `src/environments/*`, `@tests/*` → `src/tests/*`. Every folder exposes a barrel `index.ts`.

### `src/app/` layout

- `core/` — singletons: API services, interceptors, guards, interfaces, enums. `CoreModule` registers the interceptors and throws if imported twice.
- `modules/` — feature modules, **all lazy-loaded** in `app-routing.module.ts`. Each follows `modules/<name>/{<name>.module.ts, <name>-routing.module.ts, index.ts, pages/, components/, services/, ...}`. `AuthenticationGuard` protects most routes (redirects to `/login`).
- `shared/` — `SharedModule` re-exports CommonModule, forms, IonicModule, FontAwesome; imported by every feature module.
- `store/` — @ngneat/elf state (see below).
- `config/app.config.ts` — static `Config` constants (`dualisBaseUrl`, `httpTimeout`, etc.). API base URL lives in `src/environments/`.

Features: dashboard (Moodle news), plan (timetables, FullCalendar/iCalendar), dualis (grades), canteen (menus + NFC card balance), contacts, parking, apartments, map (Leaflet), sos, settings, login, imprint.

### HTTP layer

`core/services/api/` has one thin service per endpoint group; all use Angular `HttpClient` wrapped in `lastValueFrom` (promise-based API surface) against `environment.apiBaseUrl`, with `...Dto` interfaces co-located in the service file. Interceptor chain (order matters, registered in `CoreModule`):

1. `HttpAuthInterceptor` — Bearer token; on 401 refreshes the session and retries, on failure logs out.
2. `HttpTimeoutInterceptor` — 10 s timeout.
3. `HttpNativeInterceptor` — **key pattern**: requests to `Config.dualisBaseUrl` are diverted to the native `cordova-plugin-advanced-http` stack (`NativeHttpService`) to bypass CORS/cookie limits. Dualis grades are HTML-scraped from `https://dualis.dhbw.de` (parsers in `modules/dualis/services/`).
4. `HttpErrorInterceptor` — pass-through stub.

`GlobalErrorHandlerService` is the root `ErrorHandler` and shows German error alerts via `DialogService`.

### State & storage

- `store/session.repository.ts` — the only elf repository: sync getter/setter facade over an elf store holding tokens + user, persisted through `@capacitor/preferences` (`capacitor-state-storage.ts`).
- Feature data caching uses `StorageService` (Preferences wrapper) keyed by the `StorageKey` enum — not elf.

### Capacitor

- `capacitor.config.json`: appId `de.dhbw.vs.standortapp`, webDir `www`. `androidScheme: 'http'` is deliberate (Dualis cookie flow).
- Live updates via `@capawesome/capacitor-live-update`: `AppComponent.initializeLiveUpdate()` calls `ready()`, listens for `nextBundleSet$`, and asks the user before reloading. `CapacitorAppService` is injected in `AppComponent` purely for its back-button side effect — do not remove.

## Testing

- Jest via `@angular-builders/jest`; specs co-located with the file under test.
- `setup-jest.ts` patches `TestBed.createComponent` so `detectChanges()` works with OnPush components — no manual `markForCheck` needed in tests.
- Helpers in `src/tests/`: `createSpyObj<T>()` (Jasmine-style, returns `jest.Mocked<T>`), pre-built service spies in `spies/`, `SharedTestingModule` for component tests. Capacitor plugin mocks in `src/__mocks__/@capacitor/`. `jest-when` is available.
- Cypress specs in `cypress/e2e/*.cy.ts` mock the API with `cy.intercept` + fixtures; mobile viewport (411×823).

## Code style enforcement

- `eslint-plugin-unicorn` recommended is on, including `unicorn/prevent-abbreviations` — write `parameters`, not `params`.
- `@typescript-eslint/no-floating-promises` — intentionally unawaited promises use `void somePromise()`.
- Prettier with `prettier-plugin-organize-imports` (imports are auto-sorted); JSON files format one key per line.
- Logging convention: `const LOGTAG = '[ServiceName]';` prefix on console output.
