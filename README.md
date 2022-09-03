# dhbw-vs-app

<!-- [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/robingenz/dhbw-vs-app/CI/main)](https://github.com/robingenz/dhbw-vs-app/actions)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/robingenz/dhbw-vs-app?color=brightgreen&label=version)](https://github.com/robingenz/dhbw-vs-app/releases) -->

[![Platforms](https://img.shields.io/badge/platform-android%20%7C%20ios-lightgrey)](https://github.com/robingenz/dhbw-vs-app)

🎓 The **official** app for students, employees and lecturers of the Baden-Wuerttemberg Cooperative State University (DHBW) in Villingen-Schwenningen.

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)

### Getting Started

Clone this repository:

```
git clone https://github.com/robingenz/dhbw-vs-app.git
```

Change to the root directory of the project:

```
cd dhbw-vs-app
```

Install all dependencies:

```
npm i
```

Prepare and launch the Android app:

```
npx ionic cap sync android
npx ionic cap run android -l
```

Prepare and launch the iOS app:

```
npx ionic cap sync ios
npx ionic cap run ios -l
```

This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

<!-- ## Contributing 😊

See [CONTRIBUTING.md](https://github.com/robingenz/dhbw-vs-app/blob/main/CONTRIBUTING.md). -->

<!-- ## Changelog

See [CHANGELOG.md](https://github.com/robingenz/dhbw-vs-app/blob/main/CHANGELOG.md). -->

<!-- ## License

See [LICENSE](https://github.com/robingenz/dhbw-vs-app/blob/main/LICENSE). -->
