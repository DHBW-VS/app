/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * yields elements with a `data-cy` attribute that **match** a specified selector.
     */
    getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;
    /**
     * yields elements with a `data-cy` attribute that **contains** a specified selector.
     */
    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<Element>;
    /**
     * Save current state of local storage.
     */
    saveLocalStorage(): Chainable<Element>;
    /**
     * Restore last saved state of local storage.
     */
    restoreLocalStorage(): Chainable<Element>;
    /**
     * Login with demo user.
     */
    login(): Chainable<Element>;
  }
}
