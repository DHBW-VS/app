describe('SettingsPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('POST', Cypress.env('apiBaseUrl') + '/auth/revoke**', {
      statusCode: 204,
    });
    cy.visit('/settings');
  });

  it('should log out the user', () => {
    cy.getBySel('settings-page-logout-button').click();
    cy.url().should('include', '/login');
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
});
