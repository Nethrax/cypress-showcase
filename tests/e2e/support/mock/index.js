import './mockCommands';

Cypress.Commands.add('mockConfig', (fixture = 'config', statusCode = 200, options = {}) => {
	return cy.intercept({
		method: 'GET',
		url: '/env.json',
		...options,
	}, {
		fixture: fixture,
		statusCode: statusCode,
	}).as('getConfig');
});
