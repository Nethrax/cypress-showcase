import { selectors as s } from '../support/selectors';

Cypress.Commands.add('typeToInput', (selector, text, options = { clear: true }) => {
    if (options.clear) {
        cy.get(selector)
            .find('input')
            .clear();
    }

    cy.get(selector)
        .find('input')
        .click()
        .type(text, { delay: 0 });
});

Cypress.Commands.add('login', (username, password) => {
    cy.get(s.login.button)
        .click()
        .get(s.login.usernameInput)
        .type(`${username}{enter}`)
        .get(s.login.passwordInput)
        .type(password)
        .get('button')
        .contains('Login')
        .click();
});

