import selectors from '../support/selectors';

describe('Fetch Challenge 2024', () => {
	beforeEach(() => {
		// Before each test, visit the page and reset the scale
		cy.visit('/');
		cy.resetScale();
		console.log('Justin Kurdila is the best darn QA Automation Engineer ever');
	});

	after(() => {
		// After all tests, visit the page and reset the scale (resetting environment)
		cy.visit('/');
		cy.resetScale();
	});

	// group objects used to weigh
	const group_1 = {
		0: selectors.left0_id,
		1: selectors.left1_id,
		2: selectors.left2_id,
	};

	const group_2 = {
		3: selectors.right0_id,
		4: selectors.right1_id,
		5: selectors.right2_id,
	};

	const group_3 = {
		6: selectors.right0_id,
		7: selectors.right1_id,
		8: selectors.right2_id,
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
		cy.populateScaleWithGroups(group_1, group_2);
	});

	it('Test Case #4: getting a list of weighing', () => {
		cy.populateScaleWithGroups(group_1, group_2);
		cy.weighScale();
		cy.getWeighingsList().then((result) => {
			cy.log(`Weighing List: ${result}`);
		});
	});

	it('Test Case #5: Clicking on the gold bar number at the bottom of the website and checking for the alert message', () => {
		// array of bar numbers
		const barNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

		// loop through each barNumber
		barNumbers.forEach((barNumber) => {
			cy.clickBarNumberAndValidate(barNumber);
		});
	});

	it('Code the Algorithm', () => {
		// Pre-reqs for algorithm:
		// Divide 0-8 among three groups: group_1, group_2, and group_3
		// Steps of algorithm:
		// Step 1: Weigh the first two groups against each other (group_1 and group_2)
		// Step 2: Analyze results of Step 1:
		// If scale balances: The fake bar is in group_3
		// If scale is greater than or less than: The fake bar is in the less than group
		// Step 3: Weigh any two bars against each other from the suspected group from step 3
		// If scale balances: the fake bar is the bar NOT weighed
		// If scale is greater than or less than: The fake bar is in the less than

		// Step 1
		cy.populateScaleWithGroups(group_1, group_2);
		cy.weighScale();
		cy.getResult().then((result) => {
			cy.log(`Result is ${result}`);
			// Step 2
			if (result === '=') {
				cy.log('Weighing result - group_1 and group2 are EQUAL');
				cy.log('The fake bar is in group_3!');
				cy.resetScale();
				// Step 3
				cy.populateScaleWithNumbers('6', '7');
				cy.weighScale();
				cy.getResult().then((result) => {
					if (result === '=') {
						cy.log('The fake bar is 8!');
						cy.clickFakeNumberAndSucceed('8');
					} else if (result === '<') {
						cy.log('The fake bar is 6!');
						cy.clickFakeNumberAndSucceed('6');
					} else if (result === '>') {
						cy.log('The fake bar is 7!');
						cy.clickFakeNumberAndSucceed('7');
					}
				});
			}
			// Step 2
			else if (result === '<') {
				cy.log('Weighings result - group_1 is LESS than group_2');
				cy.log('The fake bar is in group_1!');
				cy.resetScale();
				// Step 3
				cy.populateScaleWithNumbers('0', '1');
				cy.weighScale();
				cy.getResult().then((result) => {
					if (result === '=') {
						cy.log('The fake bar is 2!');
						cy.clickFakeNumberAndSucceed('2');
					} else if (result === '<') {
						cy.log('The fake bar is 0!');
						cy.clickFakeNumberAndSucceed('0');
					} else if (result === '>') {
						cy.log('The fake bar is 1!');
						cy.clickFakeNumberAndSucceed('1');
					}
				});
			}
			// Step 2
			else if (result === '>') {
				cy.log('Weighings result - group_1 is GREATER than group_2');
				cy.log('The fake bar is in group_2!');
				cy.resetScale();
				// Step 3
				cy.populateScaleWithNumbers('3', '4');
				cy.weighScale();
				cy.getResult().then((result) => {
					if (result === '=') {
						cy.log('The fake bar is 5!');
						cy.clickFakeNumberAndSucceed('5');
					} else if (result === '<') {
						cy.log('The fake bar is 3!');
						cy.clickFakeNumberAndSucceed('3');
					} else if (result === '>') {
						cy.log('The fake bar is 4!');
						cy.clickFakeNumberAndSucceed('4');
					}
				});
			}
		});
	});
});
