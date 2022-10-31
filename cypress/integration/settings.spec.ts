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
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert .alert-title').contains('Abmelden');
    cy.get('ion-alert div.alert-button-group button').last().click();
    cy.url().should('include', '/login');
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('should not log out the user', () => {
    cy.getBySel('settings-page-logout-button').click();
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert .alert-title').contains('Abmelden');
    cy.get('ion-alert div.alert-button-group button').first().click();
    cy.url().should('include', '/settings');
  });
});
