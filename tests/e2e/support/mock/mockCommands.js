Cypress.Commands.add('mockGetItems',
    (fixture = 'list.json', statusCode = 200, routeMatcherOptions = {}, routeHandlerOptions = {}) => {
        return cy.intercept({
            method: 'GET',
            url: '/api/items',
            ...routeMatcherOptions,
        }, {
            fixture: fixture,
            statusCode: statusCode,
            ...routeHandlerOptions,
        }).as('getItems');
    });

Cypress.Commands.add('mockPostItem',
    (fixture = 'item.json', statusCode = 201, routeMatcherOptions = {}, routeHandlerOptions = {}) => {
        return cy.intercept({
            method: 'POST',
            url: '/api/item',
            ...routeMatcherOptions,
        }, {
            fixture: fixture,
            statusCode: statusCode,
            ...routeHandlerOptions,
    }).as('postItem');
    });