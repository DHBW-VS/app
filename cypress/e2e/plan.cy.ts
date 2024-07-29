describe('PlanPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/plans?course=WI', {
      statusCode: 200,
      fixture: 'plan-list-wi.json',
    });
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/plans/download/ical/demo', {
      statusCode: 200,
      fixture: 'demo.ics',
    });
    cy.intercept('GET', '**.openstreetmap.org/**', {
      statusCode: 200,
    });
    cy.visit('/plan');
    cy.get('ion-loading').should('not.exist');
  });

  it('should display the cards', () => {
    cy.get('ion-card').should('have.length', 2);
    cy.getBySel('plan-page-timetable-card-title').contains('Vorlesungsplan');
    cy.getBySel('plan-page-map-card-title').contains('Gebäudeplan');
  });

  it('should open the map', () => {
    cy.getBySel('plan-page-open-map-button').click();
    cy.url().should('include', '/map');
    cy.get('#map').should('be.visible');
  });

  it('should select the second plan', () => {
    cy.getBySel('plan-page-open-plan-button').should('have.attr', 'disabled');
    cy.getBySel('plan-page-plan-select').click();
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert .alert-title').contains('Vorlesungsplan auswählen');
    cy.get('ion-alert div.alert-radio-group button').should('have.length', 9);
    cy.get('ion-alert div.alert-radio-group button').eq(1).click();
    cy.get('ion-alert div.alert-button-group button').last().click();
    cy.getBySel('plan-page-plan-select').shadow().find('div.select-text').contains('WI2_Kurs_B_WI_2020.pdf');
    cy.getBySel('plan-page-open-plan-button').should('not.have.attr', 'disabled');
  });

  it('should not select a plan', () => {
    cy.getBySel('plan-page-open-plan-button').should('have.attr', 'disabled');
    cy.getBySel('plan-page-plan-select').click();
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert .alert-title').contains('Vorlesungsplan auswählen');
    cy.get('ion-alert div.alert-button-group button').first().click();
    cy.getBySel('plan-page-plan-select').shadow().find('div.select-text').should('be.empty');
    cy.getBySel('plan-page-open-plan-button').should('have.attr', 'disabled');
  });

  it('should open and close the calendar modal', () => {
    cy.getBySel('plan-page-plan-select').click();
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert .alert-title').contains('Vorlesungsplan auswählen');
    cy.get('ion-alert div.alert-radio-group button').eq(3).click();
    cy.get('ion-alert div.alert-button-group button').last().click();
    cy.getBySel('plan-page-plan-select').shadow().find('div.select-text').contains('WI4_Kurs_A_WI_2019.pdf');
    cy.getBySel('plan-page-open-plan-button').should('not.have.attr', 'disabled');
    cy.getBySel('plan-page-open-plan-button').click();
    cy.get('ion-modal').should('exist');
    cy.get('ion-modal ion-toolbar ion-title').contains('Vorlesungsplan');
    cy.getBySel('calendar-modal-close-button').click();
    cy.get('ion-modal').should('not.exist');
  });
});
