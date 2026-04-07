describe('API RestFul-Booker - Fluxo completo de Reserva', () => {
  let bookingId;
  let token;

  before(() => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: "admin",
        password: "password123"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });



  it('TC01 - Health check: Deve verificar se a API está online', () => {
    cy.request('/ping').then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('TC02 - Gerar token: Validar autenticação com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: "admin",
        password: "password123"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');

    });
  });

  it('TC03 - Login inválido: Validar erro com credenciais incorretas', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: "admin",
        password: "senha_errada_123"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason', 'Bad credentials');
    });
  });


});