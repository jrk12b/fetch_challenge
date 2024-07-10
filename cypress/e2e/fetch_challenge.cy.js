import selectors from '../support/selectors';

describe('Fetch Challenge 2024', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.resetScale();
    console.log('Justin Kurdila is the best darn QA Automation Engineer ever');
  });

  const group_1_object = {
    '0': selectors.left0_id,
    '1': selectors.left1_id, 
    '2': selectors.left2_id, 
  };

  const group_2_object = {
    '3': selectors.right0_id,
    '4': selectors.right1_id, 
    '5': selectors.right2_id, 
  };

  it('Test Case #1: clicks on buttons (“Weigh”, “Reset”)', () => {
    cy.weighScale();
    cy.resetScale();
  });

  it('Test Case #2: Getting the measurement results (field between the "bowls")', () => {
    cy.getResult().then((result) => {
      cy.log(`Result is ${result}`);
    });
  });

  it('Test Case #3: filling out the bowls grids with bar numbers (0 to 8)', () => {
    cy.populateScaleWithNumbers(group_1_object, group_2_object);
  });

  it('Test Case #4: getting a list of weighing', () => {
    cy.populateScaleWithNumbers(group_1_object, group_2_object);

    cy.weighScale();

    cy.getWeighingsList().then((result) => {
      cy.log(`Weighing List: ${result}`);
    });
  });

  it('Test Case #5: Clicking on the gold bar number at the bottom of the website and checking for the alert message', () => {
    const coins = [ 
      selectors.coin0_id, selectors.coin1_id, selectors.coin2_id, selectors.coin3_id, selectors.coin4_id, selectors.coin5_id, selectors.coin6_id, selectors.coin7_id, selectors.coin8_id
    ];  

    cy.clickBarNumberAndValidate(coins);
  });

  it.only('Code the Algorithm', () => {
    // Code the algorithm from step 1 which uses a set of actions from step 2 to find the fake gold bar
    // The algorithm should populate and weigh gold bars until a fake one is found, click on a fake bar number, output the alert message, number of weighing, and list of weighing made.

    // Weigh group_1_object and group_2_object
    cy.populateScaleWithNumbers(group_1_object, group_2_object);
    cy.weighScale();
    cy.getResult().then((result) => {
      cy.log(`Result is ${result}`);
      if (result === '=') {
        cy.log('Weighing result - group_1 and group2 are EQUAL');
        cy.log('The fake bar is in group_3!');
        cy.resetScale();
        cy.weighGoldBarsNumbers('6', '7');
        cy.getResult().then((result) => {
          if (result === '=') {
            cy.log('The fake bar is 8!');
          }
          else if (result === '<') {
            cy.log('The fake bar is 6!');
          }
          else if (result === '>') {
            cy.log('The fake bar is 7!');
          }
        });
      }
      else if (result ==='<') {
        cy.log('Weighings result - group_1 is LESS than group_2');
        cy.log('The fake bar is in group_1!');
        cy.resetScale();
        cy.weighGoldBarsNumbers('0', '1');
        cy.getResult().then((result) => {
          if (result === '=') {
            cy.log('The fake bar is 2!');
          }
          else if (result ==='<') {
            cy.log('The fake bar is 0!');
          }
          else if (result ==='>') {
            cy.log('The fake bar is 1!');
          }
        });
      }
      else if (result ==='>') {
        cy.log('Weighings result - group_1 is GREATER than group_2');
        cy.log('The fake bar is in group_2!');
        cy.resetScale();
        cy.weighGoldBarsNumbers('3', '4');
        cy.getResult().then((result) => {
          if (result === '=') {
            cy.log('The fake bar is 5!');
          }
          else if (result ==='<') {
            cy.log('The fake bar is 3!');
          }
          else if (result ==='>') {
            cy.log('The fake bar is 4!');
          }
        });
      }
    });
  });
});