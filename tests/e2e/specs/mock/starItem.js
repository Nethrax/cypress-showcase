import { routes } from '../../support/routes';
import { selectors as s } from '../../support/selectors';
import { generateRandomHexString } from '../../support/utils';
import { validationMessage} from '../../support/constants';

describe([tag.mock], 'FE-Mock.Star icon test', () => {
    beforeEach(() => {
        cy.mockConfig()
            .mockGetItems()
            .visit(routes.items)
            // wait for items to be loaded
            .wait('@getItems');
    });

    describe('Starred items', () => {
        it('Check number of default items / starred items', () => {
            // two item are not starred in mockGetItems()
            cy.get(s.items.item).should('be.visible').and('have.length', 2)
                // only one item is marked as starred in mockGetItems()
                .get(s.items.starredItem).should('be.visible').and('have.length', 1);
        });

        it('Remove star icon from starred item', () => {
            // check that only one starred item is visible on page
            cy.get(s.items.starredItem).should('be.visible').and('have.length', 1).within(function () {
                // click on star icon
                cy.get(s.starIcon.icon).click()
            });
            // check that starred item is not existing anymore
            cy.get(s.items.starredItem).should('not.exist');
        });

        it('Add star icon on default item', () => {
            // check that there is one starred item and two default items
            cy.get(s.items.starredItem).should('be.visible').and('have.length', 1)
                .get(s.items.item).should('be.visible').and('have.length', 2)
                // specify first item
                .get(s.items.item).first().within(function () {
                    // click on star icon
                    cy.get(s.starIcon.icon).click()
                });
            // check that now there are two starred items and only one default item
            cy.get(s.items.starredItem).should('be.visible').and('have.length', 2)
                .get(s.items.item).should('be.visible').and('have.length', 1);
        });
    });


    describe('Creation of new item', () => {
        beforeEach(() => {
            // click on the new item button
            cy.get(s.newItem.createButton).should('be.visible').click();
        });

        it('Create new item', () => {
            const newItemTitle = 'Create item';
            const newItemName = generateRandomHexString();
            const newItemNote = generateRandomHexString();

            cy.get(s.newItem.title).should('be.visible').invoke('text').should('eq', newItemTitle)
                // typeToInput() is custom command
                .typeToInput(s.newItem.name, newItemName)
                .typeToInput(s.newItem.note, newItemNote)
                // click on save button
                .get(s.newItem.save).click()
                // check that new item was created
                .get(s.items.item).should('be.visible').and('have.length', 4)
                .get(s.items.item).last().scrollIntoView().should('have.text', newItemName);
        });

        [
            { testName: 'empty string', inputData: '', message: validationMessage.emptyString },
            { testName: 'maximum length', inputData: generateStringOfLength(17), message: validationMessage.maximumLength },
            { testName: 'not valid', inputData: '👀', message: validationMessage.notValid},
        ].forEach(({ testName, inputData, message }) => {
            it(`Check validation message for ${testName} message on name input `, () => {
                // valid input is only 1-16 characters
                cy.typeToInput(s.newItem.name, inputData)
                    .get(s.newItem.validationMessage).should('be.visible').and('have.text', message)
                    // check that save button is disabled
                    .get(s.newItem.save).should('be.disabled');
            });
        });
    });
});