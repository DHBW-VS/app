const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "jest-preset-angular",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@angular|@fullcalendar|rxjs|preact)|!.mjs$"
  ]
};

module.exports = config;
