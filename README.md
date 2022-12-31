<p align="center"><br><img src="https://avatars.githubusercontent.com/u/112691677" width="128" height="128" /></p>
<h3 align="center">DHBW VS App</h3>
<p align="center">
  The official app for students, employees and lecturers of the<br> Baden-Wuerttemberg Cooperative State University (DHBW) in Villingen-Schwenningen.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-android%20%7C%20ios-lightgrey?style=flat-square" />
  <a href="https://github.com/DHBW-VS/app/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/actions/workflow/status/dhbw-vs/app/ci.yml?branch=main&style=flat-square" /></a>
  <a href="https://github.com/DHBW-VS/app/releases"><img src="https://img.shields.io/github/v/release/dhbw-vs/app?style=flat-square" /></a>
  <a href="https://github.com/DHBW-VS/app/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dhbw-vs/app?style=flat-square" /></a>
</p>

## Maintainers

| Maintainer | GitHub                                    | LinkedIn                                                                |
| ---------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| Robin Genz | [robingenz](https://github.com/robingenz) | [robin-genz-4a688b153](https://de.linkedin.com/in/robin-genz-4a688b153) |

## Installation

You can install the latest version from the [Play Store (Android)](https://play.google.com/store/apps/details?id=de.dhbw.vs.standortapp) and [App Store (iOS)](https://apps.apple.com/de/app/dhbw-vs/id1203299771).

## Demo

| iOS                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/13857929/194640779-38aa2542-7990-4445-868e-4f33026c02be.gif" width="266" /> |

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Install [Android Studio](https://developer.android.com/studio) for Android development
- Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for iOS development

### Getting Started

Clone this repository:

```
git clone https://github.com/DHBW-VS/app.git
```

Change to the root directory of the project:

```
cd app
```

Install all dependencies:

```
npm i
```

Prepare and launch the Android app:

```
npx ionic cap sync android
npx ionic cap run android --open --external -l
```

Prepare and launch the iOS app:

```
npx ionic cap sync ios
npx ionic cap run ios --open --external -l
```

This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

<!-- ## Contributing

See [CONTRIBUTING.md](https://github.com/dhbw-vs/app/blob/main/CONTRIBUTING.md). -->

## Changelog

See [CHANGELOG.md](https://github.com/dhbw-vs/app/blob/main/CHANGELOG.md).

## License

See [LICENSE](https://github.com/dhbw-vs/app/blob/main/LICENSE).
