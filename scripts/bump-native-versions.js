const fs = require('fs');
const path = require('path');
const semver = require('semver');
const pjson = require('../package.json');

function fetchVersion() {
  return pjson.version;
}

function updateAndroidVersion(newVersion) {
  const buildGradleFilePath = path.join('android', 'app', 'build.gradle');
  let buildGradleFileContent = readFileContent(buildGradleFilePath);

  const versionCodeRegex = /versionCode \d+/;
  const newVersionCode = semver.patch(newVersion) + semver.minor(newVersion) * 100 + semver.major(newVersion) * 10000;
  buildGradleFileContent = buildGradleFileContent.replace(versionCodeRegex, `versionCode ${newVersionCode}`);

  const versionNameRegex = /versionName "\d+.\d+.\d+"/;
  buildGradleFileContent = buildGradleFileContent.replace(versionNameRegex, `versionName "${newVersion}"`);

  writeFileContent(buildGradleFilePath, buildGradleFileContent);
}

function updateIosVersion(newVersion) {
  const infoPlistFilePath = path.join('ios', 'App', 'App', 'Info.plist');
  let infoPlistFileContent = readFileContent(infoPlistFilePath);

  const cfBundleVersionRegex = /<key>CFBundleVersion<\/key>[\r\n]\s+<string>\d+.\d+.\d+<\/string>/;
  infoPlistFileContent = infoPlistFileContent.replace(
    cfBundleVersionRegex,
    `<key>CFBundleVersion</key>\r\n  <string>${newVersion}</string>`,
  );

  const cdBundleShortVersionStringRegex = /<key>CFBundleShortVersionString<\/key>[\r\n]\s+<string>\d+.\d+.\d+<\/string>/;
  infoPlistFileContent = infoPlistFileContent.replace(
    cdBundleShortVersionStringRegex,
    `<key>CFBundleShortVersionString</key>\r\n  <string>${newVersion}</string>`,
  );

  writeFileContent(infoPlistFilePath, infoPlistFileContent);
}

function readFileContent(filePath, encoding = 'utf8') {
  return fs.readFileSync(filePath, encoding);
}

function writeFileContent(filePath, content, encoding = 'utf8') {
  fs.writeFileSync(filePath, content, encoding);
}

try {
  const version = fetchVersion();
  updateAndroidVersion(version);
  updateIosVersion(version);
} catch (err) {
  console.error(err);
  process.exit(1);
}
