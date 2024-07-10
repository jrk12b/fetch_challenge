import selectors from '../support/selectors';

// This command clicks the reset button which removes all numbers from the scale
Cypress.Commands.add('resetScale', () => {
	cy.get(selectors.gameInfo_class).prev().find(selectors.reset_id).click();
});

// This command clicks the weigh button which initializes the weighing of the scale
Cypress.Commands.add('weighScale', () => {
	cy.get(selectors.weigh_id).click();
	cy.wait(2000);
});

// This command gets the result of the weighing and returns the text (=, >, <)
Cypress.Commands.add('getResult', () => {
	cy.get(selectors.result_class).should('be.visible');
	cy.get(selectors.result_class).contains('Result').should('be.visible');
	cy.get(selectors.reset_id).filter(':disabled').as('disabledResultButton');
	cy.get('@disabledResultButton').should('exist');
	cy.get('@disabledResultButton').should('be.visible');
	return cy.get('@disabledResultButton').invoke('text');
});

// This command populates the scale with groups of numbers
// This command accepts group objects as parameters. Object should include number as key and selector id as value
// Example: group_1 = { '0': selectors.left0_id, '1': selectors.left1_id, };
Cypress.Commands.add('populateScaleWithGroups', (group_1, group2) => {
	cy.resetScale();
	for (const key in group_1) {
		const value = group_1[key];
		cy.get(value).type(key);
	}
	for (const key in group2) {
		const value = group2[key];
		cy.get(value).type(key);
	}
});

// This command populates the scale with two specific numbers
// This command accepts two strings to weigh
Cypress.Commands.add('populateScaleWithNumbers', (bar1, bar2) => {
	cy.resetScale();
	cy.get(selectors.left0_id).type(bar1);
	cy.get(selectors.right0_id).type(bar2);
});

// This command gets the list of weighings and returns the list
Cypress.Commands.add('getWeighingsList', () => {
	cy.get(selectors.gameInfo_class).find('ol', { timeout: 3000 }).as('weighings_ol');
	return cy.get('@weighings_ol').last().invoke('text');
});

// This command counts the number of weighings in the list and returns the count
Cypress.Commands.add('countWeighings', () => {
	cy.get('ol')
		.find('li')
		.its('length')
		.then((count) => {
			return count;
		});
});

// This command clicks the fake bar number and validates the alert is Yay! You find it!
// This command accepts one string as a parameter
Cypress.Commands.add('clickFakeNumberAndValidate', (barNumber) => {
	cy.get(selectors.coins_class).contains(barNumber).click();
	cy.on('window:alert', (alertText) => {
		console.log(alertText);
		expect(alertText).to.eq('Yay! You find it!');
	});
});

// This command clicks the fake bar number and logs the weighing list, weiging count, and alert text
// This command accepts one string as a parameter
Cypress.Commands.add('clickFakeNumberAndSucceed', (barNumber) => {
	cy.clickFakeNumberAndValidate(barNumber);
	cy.countWeighings().as('countWeighingsResult');
	cy.getWeighingsList().as('weighingListResult');

	cy.get('@countWeighingsResult').then((countWeighingsResult) => {
		cy.log(`NUMBER OF WEIGHINGS: ${countWeighingsResult}`);
	});
	cy.get('@weighingListResult').then((weighingListResult) => {
		cy.log(`COMPLETE WEIGHING LIST: ${weighingListResult}`);
	});
});

// This command clicks on the bar number and validates the alert text is either Oops or Yay
// This command accepts one string as a parameter
Cypress.Commands.add('clickBarNumberAndValidate', (barNumber) => {
	cy.get(selectors.coins_class).contains(barNumber).click();
	cy.on('window:alert', (alertText) => {
		console.log(alertText);
		expect(alertText).to.be.oneOf(['Oops! Try Again!', 'Yay! You find it!']);
	});
});
