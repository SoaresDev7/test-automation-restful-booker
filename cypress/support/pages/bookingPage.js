class BookingPage {
    get btnBookThisRoom() { return cy.contains('Book now'); }
    get btnReserveThisRoom() { return cy.contains('Reserve Now'); }
    get inputFirstName() { return cy.get('.room-firstname'); }
    get inputLastName() { return cy.get('.room-lastname'); }
    get inputEmail() { return cy.get('.room-email'); }
    get inputPhone() { return cy.get('.room-phone'); }
    get btnSubmit() { return cy.get('.d-grid > .btn'); }
    get btnCheckAvailability(){return cy.get('.col-8 > .btn');}

    reservarQuartoCompleto(firstName, lastName, email, phone) {
        this.btnReserveThisRoom.click();

        this.inputFirstName.type(firstName);
        this.inputLastName.type(lastName);
        this.inputEmail.type(email);
        this.inputPhone.type(phone);


        this.btnReserveThisRoom.click();
    }

    preencherFormContato(nome, email, fone) {
        cy.get('[data-testid="ContactName"]').type(nome);
        cy.get('[data-testid="ContactEmail"]').type(email);
        cy.get('[data-testid="ContactPhone"]').type(fone);
        cy.get('[data-testid="ContactSubject"]').type('Reserva de Teste');
        cy.get('[data-testid="ContactDescription"]').type('Esta é uma mensagem de automação para validar o formulário.');
        this.btnSubmit.click();
    }
}
export default new BookingPage();