describe('DashboardPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/moodle-news', {
      statusCode: 200,
      fixture: 'moodlenews.json',
    });
    cy.visit('/dashboard');
  });

  it('should display the news and links cards', () => {
    cy.getBySel('moodle-news-card-component-card-title').contains('News');
    cy.getBySel('dashboard-page-links-card-title').contains('Links');
    cy.getBySel('dashboard-page-links-card').find('ion-col').should('have.length', 4);
  });

  it('should list all news items', () => {
    cy.get('app-moodle-news-card ion-list ion-item').should('have.length', 8);
  });

  it('should scroll to the last news item', () => {
    cy.get('app-moodle-news-card ion-item').last().should('not.be.visible');
    cy.get('app-moodle-news-card ion-card-content').scrollTo('bottom');
    cy.get('app-moodle-news-card ion-item').last().should('be.visible');
  });

  it('should display a notification', () => {
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/moodle-news', {
      statusCode: 500,
    });
    cy.visit('/dashboard');
    cy.get('ion-toast').shadow().find('.toast-message').contains('Aktualisierung fehlgeschlagen').should('be.visible');
  });

  it('should load news from cache', () => {
    cy.get('app-moodle-news-card ion-list ion-item').should('have.length', 8);
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/moodle-news', {
      statusCode: 500,
    });
    cy.visit('/dashboard');
    cy.get('app-moodle-news-card ion-spinner').should('not.exist');
    cy.get('app-moodle-news-card ion-list ion-item').should('have.length', 8);
  });

  it('should not load news from the cache', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/moodle-news', {
      statusCode: 500,
    });
    cy.visit('/dashboard');
    cy.get('app-moodle-news-card ion-spinner').should('exist');
    cy.get('app-moodle-news-card ion-list').should('not.exist');
  });

  it('should open and close the news modal', () => {
    cy.get('ion-modal').should('not.exist');
    cy.get('app-moodle-news-card ion-item').first().click();
    cy.get('ion-modal').should('exist');
    cy.get('ion-modal ion-toolbar ion-title').contains('News');
    cy.get('ion-modal ion-card ion-card-title').contains('Sprachen lernen mit Rosetta Stone 21');
    cy.get('ion-modal ion-card ion-card-subtitle').contains('Donnerstag, 8. Juli 2021, 10:11');
    cy.get('ion-modal ion-toolbar ion-button').click();
    cy.get('ion-modal').should('not.exist');
  });
});
