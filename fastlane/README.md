fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android build
```
fastlane android build
```
fastlane android build

----

## iOS
### ios sync_certificates
```
fastlane ios sync_certificates
```
Download iOS certificates and provisioning profiles
### ios regenerate_certificates
```
fastlane ios regenerate_certificates
```
Regenerate iOS certificates and provisioning profiles
### ios build
```
fastlane ios build
```
fastlane ios build
### ios deploy
```
fastlane ios deploy
```
fastlane ios deploy

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
