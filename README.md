# Fetch Challenge

This is a Node JS repo using Cypress

- Cypress tests are configured to run in pipeline with github actions (`node.js.yml`)
- https://github.com/jrk12b/fetch_challenge/actions
- Code is located in `/cypress/e2e/fetch_challenge.cy.js` and `cypress/support/commands.js`

## Installation and Usage:

1. Clone repo locally

- `git clone https://github.com/jrk12b/fetch_challenge.git`

2. Navigate to root project directory

- `cd fetch_challenge`

3. Install Dependencies

- `npm i`

4. Run Cypress Tests locally

- To run cypress in command line - `npm run cy:run`
- To open cypress in cypress browser - `npm run cy:open`

5. Run Cypress tests in github actions

- navitate here `https://github.com/jrk12b/fetch_challenge/actions/workflows/node.js.yml`
- Click the Run workflow dropdown
- Click Run workflow