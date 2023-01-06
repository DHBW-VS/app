describe('ParkingPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/parking**', {
      statusCode: 200,
      fixture: 'parking.json',
    });
    cy.visit('/parking');
  });

  it('should display the cards', () => {
    cy.get('ion-card').should('have.length', 2);
    cy.get('app-parking-card').each(($el, index, $list) => {
      cy.wrap($el)
        .find('[data-cy=parking-card-staff-label]')
        .should('have.css', 'color', 'rgb(38, 38, 38)')
        .contains('Mitarbeiter');
      cy.wrap($el)
        .find('[data-cy=parking-card-students-label]')
        .should('have.css', 'color', 'rgb(38, 38, 38)')
        .contains('Studierende');
    });
    cy.get('app-parking-card').eq(0).find('ion-card-title').contains('Parkplatz 4');
    cy.get('app-parking-card')
      .eq(0)
      .find('[data-cy=parking-card-staff-count]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .contains('0');
    cy.get('app-parking-card')
      .eq(0)
      .find('[data-cy=parking-card-students-count]')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .contains('80');
    cy.get('app-parking-card').eq(1).find('ion-card-title').contains('Parkplatz 5');
    cy.get('app-parking-card')
      .eq(1)
      .find('[data-cy=parking-card-staff-count]')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .contains('99');
    cy.get('app-parking-card')
      .eq(1)
      .find('[data-cy=parking-card-students-count]')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .contains('65');
    cy.get('div.annotation')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(99, 99, 99)')
      .and('have.css', 'font-size', '12px')
      .and('have.css', 'text-align', 'center');
  });

  it('should display a notification', () => {
    cy.get('ion-card').should('have.length', 0);
    cy.get('ion-toast').shadow().find('.toast-message').contains('Verbindung wird hergestellt').should('be.visible');
    cy.get('ion-card').should('have.length', 2);
  });
});
