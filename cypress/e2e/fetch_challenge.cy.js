import selectors from '../support/selectors'
import generateRandomNumber from '../support/helpers'

describe('Fetch Challenge 2024', () => {
  beforeEach(() => {
    cy.visit('/');
    console.log('Justin Kurdila is the best darn QA Automation Engineer ever');
    cy.log('Justin Kurdila is the best darn QA Automation Engineer ever');
  });


  it('Test Case #1: clicks on buttons (“Weigh”, “Reset”)', () => {
    cy.get(selectors.weigh_id).click();
    cy.get(selectors.gameInfo_class).prev().find(selectors.reset_id).click();
  });

  it('Test Case #2: Getting the measurement results (field between the "bowls")', () => {

    cy.get(selectors.result_class).should('be.visible');

    cy.get(selectors.result_class).contains('Result').should('be.visible');

    cy.get(selectors.reset_id).filter(':disabled').as('disabledResultButton')
    cy.get('@disabledResultButton').should('exist');
    cy.get('@disabledResultButton').should('be.visible');
  });

  it.only('Test Case #3: filling out the bowls grids with bar numbers (0 to 8)', () => {
    const left_ids = [ 
      '#left_0', '#left_1', '#left_2', '#left_3', '#left_4', '#left_5', '#left_6', '#left_7','#left_8' 
    ];

    const right_ids = [ 
      '#right_0', '#right_1', '#right_2', '#right_3', '#right_4', '#right_5', '#right_6', '#right_7','#right_8' 
    ];

    left_ids.forEach((id) => {
      const randomNumber = Math.floor(Math.random() * 9);
      cy.get(selectors.game_class).find(id).clear().type(randomNumber);
    });
    
    right_ids.forEach((id) => {
      const randomNumber = Math.floor(Math.random() * 9);
      cy.get(selectors.game_class).find(id).clear().type(randomNumber);
    });

  });

}) 