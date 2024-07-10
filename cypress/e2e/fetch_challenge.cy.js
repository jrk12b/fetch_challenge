import selectors from '../support/selectors'

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

  it('Test Case #3: filling out the bowls grids with bar numbers (0 to 8)', () => {
    const left_ids = [ 
      selectors.left0_id, selectors.left1_id, selectors.left2_id, selectors.left3_id, selectors.left4_id, selectors.left5_id, selectors.left6_id, selectors.left7_id, selectors.left8_id 
    ];

    const right_ids = [ 
      selectors.right0_id, selectors.right1_id, selectors.right2_id, selectors.right3_id, selectors.right4_id, selectors.right5_id, selectors.right6_id, selectors.right7_id, selectors.right8_id
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

  it('Test Case #4: getting a list of weighing', () => {

    const left_bowl = {
      '0': selectors.left0_id,
      '1': selectors.left1_id, 
      '2': selectors.left2_id, 
      '3': selectors.left3_id, 
    };

    const right_bowl = {
      '4': selectors.right0_id,
      '5': selectors.right1_id, 
      '6': selectors.right2_id, 
      '7': selectors.right3_id, 
      '8': selectors.right4_id, 
    };

    for (const key in left_bowl) {
      const value = left_bowl[key];
      cy.get(value).clear().type(key);
    };

    for (const key in right_bowl) {
      const value = right_bowl[key];
      cy.get(value).clear().type(key);
    };

    cy.get(selectors.weigh_id).click();

    cy.get(selectors.gameInfo_class).find('li', { timeout: 5000 }).as('weighings_li');
    cy.get('@weighings_li').should('be.visible').and(($li) => { 
      expect($li).to.have.text('[0,1,2,3] < [4,5,6,7,8]'); 
    });
  });

  it('Test Case #5: Clicking on the gold bar number at the bottom of the website and checking for the alert message', () => {
    const coins = [ 
      selectors.coin0_id, selectors.coin1_id, selectors.coin2_id, selectors.coin3_id, selectors.coin4_id, selectors.coin5_id, selectors.coin6_id, selectors.coin7_id, selectors.coin8_id
    ];  

    coins.forEach((coin) => {
      cy.get(coin).click();
      cy.on('window:alert', (alertText) => {
        console.log(alertText);
        expect(alertText).to.be.oneOf(['Oops! Try Again!', 'Yay! You find it!']);
      });
    });
  });

  it.only('Code the Algorithm', () => {
    // Code the algorithm from step 1 which uses a set of actions from step 2 to find the fake gold bar
    // The algorithm should populate and weigh gold bars until a fake one is found, click on a fake bar number, output the alert message, number of weighing, and list of weighing made.
    const left_ids = [ 
      selectors.left0_id, selectors.left1_id, selectors.left2_id, selectors.left3_id, selectors.left4_id, selectors.left5_id, selectors.left6_id, selectors.left7_id, selectors.left8_id 
    ];

    const right_ids = [ 
      selectors.right0_id, selectors.right1_id, selectors.right2_id, selectors.right3_id, selectors.right4_id, selectors.right5_id, selectors.right6_id, selectors.right7_id, selectors.right8_id
    ];
    
    const group_1_object = {
      '0': selectors.left0_id,
      '1': selectors.left1_id, 
      '2': selectors.left2_id, 
    };

    const group_1_list = [ '0', '1', '2' ];

    const group_2_object = {
      '3': selectors.right0_id,
      '4': selectors.right1_id, 
      '5': selectors.right2_id, 
    };

    const group_3_object = {
      '6': selectors.right0_id,
      '7': selectors.right1_id, 
      '8': selectors.right2_id, 
    };

    for (const key in group_1_object) {
      const value = group_1_object[key];
      cy.get(value).clear().type(key);
    };

    for (const key in group_2_object) {
      const value = group_2_object[key];
      cy.get(value).clear().type(key);
    };

    cy.get(selectors.weigh_id).click();
    cy.get(selectors.gameInfo_class).find('li', { timeout: 5000 }).as('weighings_result');
    cy.get('@weighings_result').should('be.visible').then(($result) => { 
      if ($result.text().includes('=')) {
        cy.log('First Weighings result - group_1 and group2 are EQUAL');
        cy.log('The fake bar is in group_3!');
        left_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
        
        right_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
         // weighing group 3
         cy.get(selectors.left0_id).clear().type('6');
         cy.get(selectors.right0_id).clear().type('7');
         cy.get(selectors.weigh_id).click();
        cy.wait(5000);
         cy.get(selectors.gameInfo_class).find('li').last().as('weighings_result');
         cy.get('@weighings_result').should('be.visible').then(($result) => { 
           if ($result.text().includes('=')) {
             cy.log('The fake bar is 8!');
     
           } else if ($result.text().includes('<')) {
             cy.log('The fake bar is 6!');
             
     
           } else if ($result.text().includes('>')) {
             cy.log('The fake bar is 7!');
           };
         });
      } else if ($result.text().includes('<')) {
        cy.log('First Weighings result - group_1 is LESS than group_2');
        cy.log('The fake bar is in group_1!');
        left_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
        
        right_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
        // weighing group 1
        cy.get(selectors.left0_id).clear().type('0');
        cy.get(selectors.right0_id).clear().type('1');
        cy.get(selectors.weigh_id).click();
        cy.wait(5000);
        cy.get(selectors.gameInfo_class).find('li').last().as('weighings_result');
        cy.get('@weighings_result').should('be.visible').then(($result) => { 
          if ($result.text().includes('=')) {
            cy.log('The fake bar is 2!');
    
          } else if ($result.text().includes('<')) {
            cy.log('The fake bar is 0!');
            
    
          } else if ($result.text().includes('>')) {
            cy.log('The fake bar is 1!');
          };
        });
      } else if ($result.text().includes('>')) {
        cy.log('First Weighings result - group_1 is GREATER than group_2');
        cy.log('The fake bar is in group_2!');
        left_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
        
        right_ids.forEach((id) => {
          cy.get(selectors.game_class).find(id).clear();
        });
         // weighing group 2
         cy.get(selectors.left0_id).clear().type('3');
         cy.get(selectors.right0_id).clear().type('4');
         cy.get(selectors.weigh_id).click();
         cy.wait(5000);
         cy.get(selectors.gameInfo_class).find('li').last().as('weighings_result');
         cy.get('@weighings_result').should('be.visible').then(($result) => { 
           if ($result.text().includes('=')) {
             cy.log('The fake bar is 5!');
     
           } else if ($result.text().includes('<')) {
             cy.log('The fake bar is 3!');
             
     
           } else if ($result.text().includes('>')) {
             cy.log('The fake bar is 4!');
           };
         });

      };
    });  
  });
});