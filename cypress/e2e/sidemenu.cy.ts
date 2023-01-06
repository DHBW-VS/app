describe('Sidemenu', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/moodle-news', {
      statusCode: 200,
    });
    cy.visit('/dashboard');
    cy.get('ion-menu[menu-id="authenticated"] ion-item ion-label').as('ionLabel');
  });

  it('should open and close the sidemenu', () => {
    cy.get('ion-menu[menu-id="unauthenticated"]').should('be.not.visible');
    cy.get('ion-menu[menu-id="authenticated"]').should('be.not.visible');
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('ion-menu[menu-id="unauthenticated"]').should('be.not.visible');
    cy.get('ion-menu[menu-id="authenticated"]').should('be.visible');
    cy.get('ion-menu[menu-id="authenticated"]').shadow().find('ion-backdrop').click({ force: true });
    cy.get('ion-menu[menu-id="unauthenticated"]').should('be.not.visible');
    cy.get('ion-menu[menu-id="authenticated"]').should('be.not.visible');
  });

  it('should display all menu items', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('ion-menu[menu-id="authenticated"] ion-list ion-item')
      .should('have.length', 10)
      .each(($element, index, $list) => {
        cy.wrap($element).should('be.visible');
      });
  });

  it('should navigate to the plan page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Pläne').closest('ion-item').click();
    cy.url().should('include', '/plan');
  });

  it('should navigate to the canteen page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Mensa').closest('ion-item').click();
    cy.url().should('include', '/canteen');
  });

  it('should navigate to the parking page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Parkplätze').closest('ion-item').click();
    cy.url().should('include', '/parking');
  });

  it('should navigate to the apartments page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Wohnungsmarkt').closest('ion-item').click();
    cy.url().should('include', '/apartments');
  });

  it('should navigate to the dualis-login page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Dualis').closest('ion-item').click();
    cy.url().should('include', '/dualis/login');
  });

  it('should navigate to the contacts page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Kontakte').closest('ion-item').click();
    cy.url().should('include', '/contact');
  });

  it('should navigate to the sos page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('SOS').closest('ion-item').click();
    cy.url().should('include', '/sos');
  });

  it('should navigate to the imprint page and back', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('@ionLabel').contains('Impressum').closest('ion-item').click();
    cy.url().should('include', '/imprint');
    cy.getBySel('imprint-page-back-button').click();
    cy.url().should('include', '/dashboard');
  });

  it('should navigate to the settings page', () => {
    cy.get('ion-toolbar ion-menu-button').click();
    cy.get('ion-router-outlet').should('have.class', 'menu-content-open');
    cy.get('ion-menu[menu-id="authenticated"] ion-button ion-icon').should('have.attr', 'name', 'settings');
    cy.get('ion-menu[menu-id="authenticated"] ion-button').click();
    cy.url().should('include', '/settings');
  });
});
