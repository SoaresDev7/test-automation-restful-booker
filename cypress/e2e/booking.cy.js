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


  it('TC04 - Criar reserva: Validar criação de novo registro', () => {
    const checkinDate = new Date().toISOString().split('T')[0];

    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: "Tobias",
        lastname: "Soares cypress",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: checkinDate,
          checkout: "2026-05-10"
        },
        additionalneeds: "Café da manhã"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.have.property('firstname', 'Tobias');
      bookingId = response.body.bookingid;
    });
  });

  it('TC05 - Consultar reserva: Validar busca por ID ', () => {
    cy.request(`/booking/${bookingId}`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('lastname', 'Soares cypress');
    });
  });


  it('TC06 - Atualizar reserva: Validar alteração de dados', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`
      },
      body: {
        firstname: "Tobias",
        lastname: "Soares atualizado",
        totalprice: 300,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-05-01",
          checkout: "2026-05-15"
        },
        additionalneeds: "Almoço"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('lastname', 'Soares atualizado');
      expect(response.body).to.have.property('totalprice', 300);
    });
  });

  it('TC07 - Deletar reserva: Validar exclusão do registro', () => {
    cy.request({
      method: 'DELETE',
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.eq('Created');
    });
  });


  it('TC08 - Segurança: Validar que a reserva foi excluída', () => {
    cy.request({
      url: `/booking/${bookingId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});