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
};

module.exports = config;
