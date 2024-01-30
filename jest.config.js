const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const esModules = ['@angular', '@fullcalendar', '@ionic', '@stencil', 'rxjs', 'preact'];

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "jest-preset-angular",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules.join('|')})|!.mjs$`],
};

module.exports = config;
