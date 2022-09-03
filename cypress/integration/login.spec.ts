describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should redirect to dashboard after login with valid credentials', () => {
    cy.intercept('POST', Cypress.env('apiBaseUrl') + '/auth/token', {
      statusCode: 200,
      fixture: 'token.json',
    });
    cy.get('ion-input[formControlName=username] input').type('test');
    cy.get('ion-input[formControlName=password] input').type('test');
    cy.get('ion-button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should display a modal after login with invalid credentials', () => {
    cy.intercept('POST', Cypress.env('apiBaseUrl') + '/auth/token', {
      statusCode: 401,
    });
    cy.get('ion-input[formControlName=username] input').type('test');
    cy.get('ion-input[formControlName=password] input').type('test');
    cy.get('ion-button[type=submit]').click();
    cy.get('ion-alert .alert-message').contains('Anmeldename oder Kennwort falsch');
  });

  it('should display a modal after login without credentials', () => {
    cy.get('ion-button[type=submit]').click();
    cy.get('ion-alert .alert-message').contains('fülle alle Eingabefelder aus');
  });
});
