describe('CanteenPage', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/canteen-menus', {
      statusCode: 200,
      fixture: 'canteen.json',
    });
    cy.visitMobile('/canteen');
    cy.get('ion-loading').should('not.exist');
  });

  it('should display the cards and segment buttons', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 3);
    cy.get('swiper-slide').should('have.length', 3);
    cy.get('app-canteen-dish-card').should('have.length', 18);
    cy.get('swiper-slide').first().find('app-canteen-dish-card').should('have.length', 6);
  });

  it('should display an alert that the canteen is currently closed', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/canteen-menus', {
      statusCode: 200,
      fixture: 'canteen-closed.json',
    });
    cy.visit('/canteen');
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert .alert-message').contains('Die Mensa hat zurzeit nicht geöffnet.');
    cy.get('ion-alert button').click();
    cy.get('ion-alert').should('not.exist');
  });

  it('should display an alert that the network request failed', () => {
    cy.clearLocalStorage();
    cy.restoreLocalStorage();
    cy.intercept('GET', Cypress.env('apiBaseUrl') + '/canteen-menus', {
      statusCode: 500,
    });
    cy.visit('/canteen');
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert .alert-message').contains('Abfrage fehlgeschlagen!');
    cy.get('ion-alert button').click();
    cy.get('ion-alert').should('not.exist');
  });

  it('should swipe right and left', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 3);
    cy.get('ion-header ion-segment ion-segment-button').eq(0).as('firstSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(1).as('secondSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(2).as('thirdSegmentButton');
    cy.get('@firstSegmentButton').shadow().find('div[part="indicator"]').as('firstSegmentButtonIndicator');
    cy.get('@secondSegmentButton').shadow().find('div[part="indicator"]').as('secondSegmentButtoIndicatorn');
    cy.get('@thirdSegmentButton').shadow().find('div[part="indicator"]').as('thirdSegmentButtonIndicator');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('swiper-container').should('exist');
    cy.get('swiper-slide').should('have.length', 3);
    cy.wait(1000);
    // @ts-ignore
    cy.get('swiper-container').swipe({ delay: 100 }, 'right', 'left');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '1');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
    // @ts-ignore
    cy.get('swiper-container').swipe({ delay: 100 }, 'right', 'left');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '1');
    // @ts-ignore
    cy.get('swiper-container').swipe({ delay: 100 }, 'right', 'left');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '1');
    // @ts-ignore
    cy.get('swiper-container').swipe({ delay: 100 }, 'left', 'right');
    // @ts-ignore
    cy.get('swiper-container').swipe({ delay: 100 }, 'left', 'right');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
  });

  it('should click the segment button', () => {
    cy.get('ion-header ion-segment ion-segment-button').should('have.length', 3);
    cy.get('ion-header ion-segment ion-segment-button').eq(0).as('firstSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(1).as('secondSegmentButton');
    cy.get('ion-header ion-segment ion-segment-button').eq(2).as('thirdSegmentButton');
    cy.get('@firstSegmentButton').shadow().find('div[part="indicator"]').as('firstSegmentButtonIndicator');
    cy.get('@secondSegmentButton').shadow().find('div[part="indicator"]').as('secondSegmentButtoIndicatorn');
    cy.get('@thirdSegmentButton').shadow().find('div[part="indicator"]').as('thirdSegmentButtonIndicator');
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButton').click();
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '1');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButton').click();
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '0');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@firstSegmentButton').click();
    cy.get('@firstSegmentButtonIndicator').should('have.css', 'opacity', '1');
    cy.get('@secondSegmentButtoIndicatorn').should('have.css', 'opacity', '0');
    cy.get('@thirdSegmentButtonIndicator').should('have.css', 'opacity', '0');
  });

  it('should show more dish information', () => {
    cy.get('app-canteen-dish-card').first().as('firstCard');
    cy.get('@firstCard').find('[data-cy=canteen-dish-card-more-button]').as('moreButton');
    cy.get('@firstCard').find('[data-cy=canteen-dish-card-more-container]').should('not.exist');
    cy.get('@moreButton').contains('Mehr');
    cy.get('@moreButton').click();
    cy.get('@firstCard').find('[data-cy=canteen-dish-card-more-container]').should('exist');
    cy.get('@moreButton').contains('Weniger');
    cy.get('@moreButton').click();
    cy.get('@moreButton').contains('Mehr');
    cy.get('@firstCard').find('[data-cy=canteen-dish-card-more-container]').should('not.exist');
  });

  it('should scroll to the last dish card', () => {
    cy.get('swiper-slide').first().find('app-canteen-dish-card').last().should('not.be.visible');
    cy.get('app-canteen ion-content').shadow().find('main').scrollTo('bottom');
    cy.get('swiper-slide').first().find('app-canteen-dish-card').last().should('be.visible');
  });
});
