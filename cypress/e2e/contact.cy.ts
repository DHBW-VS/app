describe('ContactPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/contact-groups**', {
      statusCode: 200,
      fixture: 'contacts.json',
    });
    cy.visit('/contact');
    cy.get('ion-loading').should('not.exist');
  });

  it('should display all contact cards', () => {
    cy.get('h2').should('have.length', 2);
    cy.get('app-contact-card').should('have.length', 8);
  });

  it('should scroll to the last contact card', () => {
    cy.get('app-contact-card').last().should('not.be.visible');
    cy.get('app-contacts ion-content').shadow().find('main').scrollTo('bottom');
    cy.get('app-contact-card').last().should('be.visible');
  });

  it('should display an alert that the network request failed', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/contact-groups**', {
      statusCode: 500,
    });
    cy.visit('/contact');
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert .alert-message').contains('Abfrage fehlgeschlagen!');
    cy.get('ion-alert button').click();
    cy.get('ion-alert').should('not.exist');
  });

  it('should load contacts from cache', () => {
    cy.get('app-contact-card').should('have.length', 8);
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/contact-groups**', {
      statusCode: 500,
    });
    cy.visit('/contact');
    cy.get('ion-loading').should('not.exist');
    cy.get('app-contact-card').should('have.length', 8);
  });

  it('should not load news from the cache', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/contact-groups**', {
      statusCode: 500,
    });
    cy.visit('/contact');
    cy.get('ion-loading').should('not.exist');
    cy.get('app-contact-card').should('not.exist');
  });

  it('should filter the contacts', () => {
    cy.getBySel('contacts-page-searchbar').find('input').type('Herzlich');
    cy.get('app-contact-card').should('exist').and('have.length', 1);
    cy.get('app-contact-card ion-card-title').contains('Prof. Dr. Wolfgang Herzlich');
    cy.getBySel('contacts-page-searchbar').find('button').click();
    cy.getBySel('contacts-page-searchbar').find('input').should('be.empty');
    cy.get('app-contact-card').should('have.length', 8);
  });
});
