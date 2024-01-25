import { generateRandomHexString } from '../../support/utils';
import { validationMessage } from '../../support/constants';
import { routes } from '../../support/routes';
import { selectors as s } from '../../support/selectors';

describe([tag.mock], 'FE-Mock.New item tests', () => {
    describe('Creation of new item', () => {
        beforeEach(() => {
            cy.mockConfig()
                .mockGetItems()
                .visit(routes.newItem)
                .get(s.newItem.title).should('be.visible');
        });

        it('Creation of a new item', () => {
            const newItemTitle = 'Create item';
            const newItemName = generateRandomHexString();
            const newItemNote = generateRandomHexString();

            cy.get(s.newItem.title).invoke('text').should('eq', newItemTitle)
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
            { testName: 'not valid', inputData: '👀', message: validationMessage.notValid },
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