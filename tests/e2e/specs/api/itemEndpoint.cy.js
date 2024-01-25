import { assert } from 'chai';
import { dataDefaults } from '../../support/api/dataDefaults';

let adminToken;

describe([tag.api], 'E2E.API - Items endpoint', () => {
    const defaultItem = dataDefaults.item();

    before(() => {
        cy.dbDelete();
        cy.getToken(users.admin.username, users.admin.password).its(token).then((token) => {
            adminToken = token;
        });
    });

    it('GET /items returns status 200 with correct response', function () {
        cy.postItem(adminToken, defaultItem);
        cy.getItems(adminToken, false).then((response) => {
            assert.equal(response.status, 200);
            assert.equal(response.body.items.length, 1)
            assert.equal(response.body.id[0], defaultItem.id)
            assert.equal(response.body.name[0], defaultItem.name)
            assert.equal(response.body.note[0], defaultItem.note)
        });
    });

    [
        { input: defaultItem, expectedStatus: 200, testName: 'valid data' },
        { input: { ...defaultItem, name: '' }, expectedStatus: 400, testName: 'invalid data - empty name' },
        { input: { ...defaultItem, note: '' }, expectedStatus: 400, testName: 'invalid data - empty note' },
    ].forEach(({ input, expectedStatus, testName }) => {
        it(`POST /items returns status ${expectedStatus} on ${testName}`, function () {
            cy.postItem(adminToken, input, false).then((response) => {
                // return message for invalid input otherwise set message as empty string
                const message = (response.status > 201) ? response.body.message : '';
                // check that status code is equal to expectedStatus
                assert.equal(response.status, expectedStatus, message);
            });
        });
    });
});