Cypress.Commands.add('selecionarDatasNoCalendario', () => {
    cy.get('.rbc-date-cell').contains('20').trigger('mousedown', { which: 1 });
    cy.get('.rbc-date-cell').contains('25').trigger('mousemove').trigger('mouseup', { force: true });
});

Cypress.Commands.add('loginAdminUI', () => {
    cy.visit('/#/admin');
    cy.get('[data-testid="username"]').type('admin');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="submit"]').click();
});