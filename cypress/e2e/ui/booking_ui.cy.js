import bookingPage from '../../support/pages/bookingPage';
import { faker } from '@faker-js/faker';

describe('UI RestFul-Booker Platform - Suíte Completa de Interface', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('platformUrl'), {failOnStatusCode: false});
    });

    context('Validação de contato e mensagens', () => {
        it('TC18 - Deve enviar mensagem de contato com sucesso', () => {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const phone = faker.string.numeric(11);

            bookingPage.fillOutContactForm(name, email, phone);

            bookingPage.validateContactSuccess(name);
        });

        it('TC19 - Deve validar mensagens de erro no formulário de contato vazio', () => {
            bookingPage.btnSubmit.click();
            bookingPage.validateContactErrorMessages();
        });
    });

    context('Fluxo de reserva e calendário', () => {
        it('TC04/05 (UI) - Deve realizar uma reserva completa via interface', () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email();
            const phone = faker.string.numeric(12);

            const dateCheckin = faker.date.future();
            const dateCheckout = faker.date.soon({days: 10, refDate: dateCheckin});
            const formatDate = (date) => {
                return date.toLocaleDateString('pt-BR');
            };

            bookingPage.inputCheckin.clear().type(formatDate(dateCheckin));
            bookingPage.inputCheckout.clear().type(formatDate(dateCheckout));


            bookingPage.btnCheckAvailability.click();

            bookingPage.btnBookThisRoom.click();
            bookingPage.bookEntireRoom(firstName,lastName,email,phone);
            bookingPage.confirmBooking;
        });

        it('TC10/13 (UI) - Deve impedir reserva com dados incompletos', () => {
            bookingPage.btnBookThisRoom.first().click();
            bookingPage.btnReserveThisRoom.click();
            bookingPage.btnReserveThisRoom.click();

            const errosEsperados = [
                'must not be empty',
                'Lastname should not be blank',
                'Firstname should not be blank',
                'size must be between 11 and 21'
            ];

            errosEsperados.forEach(msg => {
                cy.contains(msg).should('be.visible');
            });
        });
    });

    context('Regras de negócio e Bugs (UI)', () => {
        it('TC14/15 (UI) - Deve validar se a interface permite datas inválidas', () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email();
            const phone = faker.string.numeric(12);
            
            const dateCheckin = faker.date.future();
            const dateCheckout = faker.date.past({refDate: dateCheckin});
            const formatDate = (date) => {
                return date.toLocaleDateString('pt-BR');
            };
            
            bookingPage.inputCheckin.clear().type(formatDate(dateCheckin));
            bookingPage.inputCheckout.clear().type(formatDate(dateCheckout));
            
            
            bookingPage.btnCheckAvailability.click();
            
            bookingPage.btnBookThisRoom.click();
            bookingPage.bookEntireRoom(firstName,lastName,email,phone);
            bookingPage.reportImproperConfirmation;
        });
    });
});