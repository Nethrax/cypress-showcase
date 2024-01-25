import { selectors as s } from '../support/selectors';
import StarToggle from '@/components/StarToggle';

describe('FE-Component.StarIcon', () => {
    it('Renders empty star icon', () => {
        const props = {
            selected: false,
        };

        cy.mount(StarIcon, { props });
        cy.get(s.starIcon.starEmpty).should('be.visible');
    });

    it('Renders filled star icon', () => {
        const props = {
            selected: true,
        };

        cy.mount(starIcon, { props });
        cy.get(s.starIcon.starFilled).should('be.visible');
    });

    it('Dispatches "toggle" event when clicked on icon', () => {
        const onToggle = cy.spy().as('toggle');
        const props = {
            selected: false,
            onToggle,
        };

        cy.mount(StarIcon, { props });
        cy.get(s.starIcon.icon).click()
        .get('@toggle').should('have.been.calledOnce');
    });
});

