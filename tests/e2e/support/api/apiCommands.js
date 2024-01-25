import { apiEndpoints } from '../endpoints';
import { headers } from './utils';

Cypress.Commands.add({
    getItems (token, queryParameters, failOnStatusCode) {
        const options = {
            headers: {
                ...headers(token),
            },
            failOnStatusCode: failOnStatusCode ?? true,
            method: 'GET',
            url: apiEndpoints.items(),
            qs: queryParameters,
        };

        cy.request(options).then(response => {
            return cy.wrap(response);
        });
    },
})

Cypress.Commands.add({
    postItem (token, data, failOnStatusCode) {
        const options = {
            headers: {
                ...headers(token),
            },
            failOnStatusCode: failOnStatusCode ?? true,
            method: 'POST',
            url: apiEndpoints.item(),
            body: data,
        };

        cy.request(options).then(response => {
            return cy.wrap(response);
        });
    },
})