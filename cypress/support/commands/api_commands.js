import { faker } from '@faker-js/faker';

Cypress.Commands.add('getTokenApi', () => {
    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: { username: Cypress.env('auth_username'), password: Cypress.env('auth_password') }
    }).then((res) => {
        Cypress.env('token', res.body.token);
    });
});
Cypress.Commands.add('createBookingApi', (overrides = {}) => {
    const defaultPayload = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
            checkin: "2026-05-01",
            checkout: "2026-05-10"
        },
        additionalneeds: "Breakfast"
    };

    return cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: { ...defaultPayload, ...overrides },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('generateBookingPayload', () => {
    return cy.wrap({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
            checkin: "2026-05-01",
            checkout: "2026-05-10"
        },
        additionalneeds: "Breakfast"
    });
});