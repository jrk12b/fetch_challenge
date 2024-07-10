// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import selectors from '../support/selectors';

Cypress.Commands.add('resetScale', () => {
    cy.get(selectors.gameInfo_class).prev().find(selectors.reset_id).click();
});

Cypress.Commands.add('weighScale', () => {
    cy.get(selectors.weigh_id).click();
    cy.wait(3000);
});

Cypress.Commands.add('getResult', () => {
    cy.get(selectors.result_class).should('be.visible');
    cy.get(selectors.result_class).contains('Result').should('be.visible');
    cy.get(selectors.reset_id).filter(':disabled').as('disabledResultButton')
    cy.get('@disabledResultButton').should('exist');
    cy.get('@disabledResultButton').should('be.visible');
    return cy.get('@disabledResultButton').invoke('text');
});


Cypress.Commands.add('populateScaleWithNumbers', (group1, group2) => {
    cy.resetScale();
    for (const key in group1) {
        const value = group1[key];
        cy.get(value).type(key);
      };
      for (const key in group2) {
        const value = group2[key];
        cy.get(value).type(key);
    };
});

Cypress.Commands.add('weighGoldBarsNumbers', (bar1, bar2) => {
    cy.resetScale();
    cy.get(selectors.left0_id).type(bar1);
    cy.get(selectors.right0_id).type(bar2);
    cy.weighScale();
});

Cypress.Commands.add('getWeighingsList', () => {
    cy.get(selectors.gameInfo_class).find('ol', { timeout: 3000 }).as('weighings_ol');
    return cy.get('@weighings_ol').last().invoke('text');
});

Cypress.Commands.add('clickBarNumberAndValidate', (coins) => {
    coins.forEach((coin) => {
        cy.get(coin).click();
        cy.on('window:alert', (alertText) => {
          console.log(alertText);
          expect(alertText).to.be.oneOf(['Oops! Try Again!', 'Yay! You find it!']);
        });
      });
});


