// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getBySel', (selector: string, ...args: any[]) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector: string, ...args: any[]) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
});

let LOCAL_STORAGE_MEMORY: { [key: string]: string } = {};

Cypress.Commands.add('saveLocalStorage', () => {
  for (const key of Object.keys(localStorage)) {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  }
});

Cypress.Commands.add('restoreLocalStorage', () => {
  for (const key of Object.keys(LOCAL_STORAGE_MEMORY)) {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  }
});

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.intercept('POST', Cypress.env('apiBaseUrl') + '/auth/token', {
    statusCode: 200,
    fixture: 'token.json',
  });
  cy.get('ion-input[formControlName=username] input').type('test');
  cy.get('ion-input[formControlName=password] input').type('test');
  cy.get('ion-button[type=submit]').click();
  cy.url().should('include', '/dashboard');
});
