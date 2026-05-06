class BookingPage {
    get btnBookThisRoom() { return cy.contains('Book now'); }
    get btnReserveThisRoom() { return cy.contains('Reserve Now'); }
    get inputFirstName() { return cy.get('.room-firstname'); }
    get inputLastName() { return cy.get('.room-lastname'); }
    get inputEmail() { return cy.get('.room-email'); }
    get inputPhone() { return cy.get('.room-phone'); }
    get btnSubmit() { return cy.get('.d-grid > .btn'); }
    get btnCheckAvailability(){return cy.get('.col-8 > .btn');}
    get inputCheckin() {
        return cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control');
    }
    get inputCheckout() {
        return cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control');
    }

    get confirmBooking(){
        cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body')
            .should('be.visible')
            .contains('h2', 'Booking Confirmed');

        cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .btn').should('be.visible').click();
    }

    get reportImproperConfirmation() {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Booking Confirmed')) {
                cy.screenshot('bug-ui-datas-invalidas-aceitas');
                throw new Error(
                    'BUG ATIVO (UI): Interface confirmou reserva com datas inválidas. ' +
                    'Esperado: rejeitar checkout anterior ao checkin.'
                );
            }
        });
    }


    bookEntireRoom(firstName, lastName, email, phone) {
        this.btnReserveThisRoom.click();

        this.inputFirstName.type(firstName);
        this.inputLastName.type(lastName);
        this.inputEmail.type(email);
        this.inputPhone.type(phone);


        this.btnReserveThisRoom.click();
    }

    fillOutContactForm(nome, email, fone) {
        cy.get('[data-testid="ContactName"]').type(nome);
        cy.get('[data-testid="ContactEmail"]').type(email);
        cy.get('[data-testid="ContactPhone"]').type(fone);
        cy.get('[data-testid="ContactSubject"]').type('Reserva de Teste');
        cy.get('[data-testid="ContactDescription"]').type('Esta é uma mensagem de automação para validar o formulário.');
        this.btnSubmit.click();
    }
}
export default new BookingPage();