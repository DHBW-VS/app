describe('ApartmentsPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/apartments/offers**', {
      statusCode: 200,
      fixture: 'apartment-offers.json',
    });
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/apartments/searches**', {
      statusCode: 200,
      fixture: 'apartment-searches.json',
    });
    cy.visitMobile('/apartments');
    cy.get('ion-loading').should('not.exist');
  });

  it('should display the cards and segment buttons', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 2);
    cy.get('ion-slide').should('have.length', 2);
    cy.get('app-apartment-card').should('have.length', 6);
    cy.get('ion-slide').first().find('app-apartment-card').should('have.length', 3);
  });

  it('should display an alert that the network request failed', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/**', {
      statusCode: 500,
    });
    cy.visit('/apartments');
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert .alert-message').contains('Abfrage fehlgeschlagen!');
    cy.get('ion-alert button').click();
    cy.get('ion-alert').should('not.exist');
  });

  it('should swipe right and left', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 2);
    cy.get('ion-header ion-segment ion-segment-button').eq(0).as('firstSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(1).as('secondSegmentButton');
    cy.get('@firstSegmentButton').shadow().find('div[part="indicator"]').as('firstSegmentButtonIndicator');
    cy.get('@secondSegmentButton').shadow().find('div[part="indicator"]').as('secondSegmentButtoIndicatorn');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('ion-slides').should('exist');
    cy.get('ion-slide').should('have.length', 2);
    cy.wait(1000);
    // @ts-ignore
    cy.get('ion-slides').swipe({ delay: 100 }, 'right', 'left');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '1');
    // @ts-ignore
    cy.get('ion-slides').swipe({ delay: 100 }, 'right', 'left');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '1');
    // @ts-ignore
    cy.get('ion-slides').swipe({ delay: 100 }, 'left', 'right');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
  });

  it('should click the segment button', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 2);
    cy.get('ion-header ion-segment ion-segment-button').eq(0).as('firstSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(1).as('secondSegmentButton');
    cy.get('@firstSegmentButton').shadow().find('div[part="indicator"]').as('firstSegmentButtonIndicator');
    cy.get('@secondSegmentButton').shadow().find('div[part="indicator"]').as('secondSegmentButtoIndicatorn');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButton').click();
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '1');
    cy.get('@firstSegmentButton').click();
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
  });

  it('should open and close the apartment modal', () => {
    cy.getBySel('apartment-card-open-button').first().click();
    cy.get('ion-modal').should('exist');
    cy.get('ion-modal ion-toolbar ion-title').contains('Wohnungsmarkt');
    cy.get('ion-modal ion-card ion-card-title').contains('Timo Schnell');
    cy.get('ion-modal ion-card ion-card-subtitle').contains('06.07.2021');
    cy.get('ion-modal ion-toolbar ion-button').click();
    cy.get('ion-modal').should('not.exist');
  });

  it('should open and close the menu popover', () => {
    cy.getBySel('apartments-page-open-menu-popover-button').click();
    cy.get('ion-popover').should('exist');
    cy.get('app-apartments-menu-popover').should('be.visible');
    cy.get('app-apartments-menu-popover').find('ion-item').should('have.length', 2);
    cy.get('ion-popover').shadow().find('ion-backdrop').click();
  });

  it('should scroll to the last apartment card', () => {
    cy.get('ion-slide').first().find('app-apartment-card').last().should('not.be.visible');
    cy.get('app-apartments ion-content').shadow().find('main').scrollTo('bottom');
    cy.get('ion-slide').first().find('app-apartment-card').last().should('be.visible');
  });
});
