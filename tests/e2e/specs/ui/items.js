import { users } from '../../support/constants';
import { routes } from '../../support/routes';
import { selectors as s } from '../../support/selectors';
import { dataDefaults } from '../../support/api/dataDefaults';

let userToken;
const newItemName = generateRandomHexString();
const newItemNote = generateRandomHexString();
const defaultItem = dataDefaults.item();

describe([tag.ui], 'E2E.Items tests', () => {
    before(() => {
        cy.getToken(users.user.username, users.user.password).its(token).then((token) => {
            userToken = token;
        });
    });

    beforeEach(() => {
        cy.dbDelete()
            .login(users.admin.username, users.admin.password)
            .visit(routes.items);
    });

    it('User is able to create new item', () => {
        cy.get(s.newItem.createButton).click()
            .typeToInput(s.newItem.name, newItemName)
            .typeToInput(s.newItem.note, newItemNote)
            .get(s.newItem.save).click()
            .get(s.items.item).last().should('be.visible').and('have.text', newItemName);
    });

    it('Use is able to label item as starred', () => {
        // create item via API
        cy.postItem(userToken, defaultItem)
            // reload the page so item is visible
            .reload()
            .url().should('include', routes.items);

        // user can label item as starred
        cy.get(s.items.starredItem).should('not.exist')
            .get(s.items.item).should('have.length', 1)
            .get(s.starIcon.icon).click()
            .get(s.items.starredItem).should('be.visible').and('have.length', 1)
            .get(s.items.item).should('not.exist');
    });
});
