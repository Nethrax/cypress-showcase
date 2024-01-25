Cypress.Commands.addAll({
	dbDelete () {
		cy.task('executeQuery', {
			dbType: 'db-name',
			sql: `
					delete from items;
                    delete from items_audit;
                `,
            });
    }
});