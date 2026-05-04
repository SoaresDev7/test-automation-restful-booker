import { faker } from '@faker-js/faker';

const bookingSchema = {
    firstname:      { type: 'string',  required: true },
    lastname:       { type: 'string',  required: true },
    totalprice:     { type: 'number',  required: true, minimum: 0 },
    depositpaid:    { type: 'boolean', required: true },
    additionalneeds:{ type: 'string',  required: false },
    bookingdates: {
        type: 'object',
        required: true,
        properties: {
            checkin:  { type: 'string', required: true },
            checkout: { type: 'string', required: true }
        }
    }
};


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
    const checkin  = faker.date.future();
    const checkout = faker.date.soon({ days: 9, refDate: checkin });

    const defaultPayload = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
            checkin:  checkin.toISOString().split('T')[0],
            checkout: checkout.toISOString().split('T')[0]
        },
        additionalneeds: "Breakfast"
    };

    return cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: {
            ...defaultPayload,
            ...overrides,
            bookingdates: {
                ...defaultPayload.bookingdates,
                ...overrides.bookingdates
            }
        },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('validateBookingSchema', (booking) => {
    Object.entries(bookingSchema).forEach(([field, rules]) => {

        if (rules.required) {
            expect(booking, `Campo obrigatório ausente: ${field}`)
                .to.have.property(field);
        }

        if (booking[field] !== undefined) {
            expect(typeof booking[field], `Tipo inválido no campo: ${field}`)
                .to.eq(rules.type);
        }

        if (rules.minimum !== undefined) {
            expect(booking[field], `${field} abaixo do mínimo permitido`)
                .to.be.at.least(rules.minimum);
        }

        if (rules.properties) {
            Object.entries(rules.properties).forEach(([subField, subRules]) => {
                expect(booking[field], `Subcampo ausente: ${field}.${subField}`)
                    .to.have.property(subField);
                expect(typeof booking[field][subField], `Tipo inválido: ${field}.${subField}`)
                    .to.eq(subRules.type);
            });
        }
    });
});