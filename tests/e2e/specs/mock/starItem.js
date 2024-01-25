import { routes } from '../../support/routes';
import { selectors as s } from '../../support/selectors';


describe([tag.mock], 'FE-Mock.Star icon tests', () => {
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
});