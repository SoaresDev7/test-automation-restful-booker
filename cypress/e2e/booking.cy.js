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


  //Suíte de configuração e smoke tests
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



  //Fluxo funcional
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



  //Negativos, segurança e Edge cases
  it('TC08 - Consulta ID inexistente: Validar erro 404', () => {
    cy.request({
      url: '/booking/99999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('TC09 - Atualização sem token: Garantir proteção 403', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      failOnStatusCode: false,
      body: { firstname: "Hacker"}
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('TC10 - Criar dado inválido: Testar robustez do sistema', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      failOnStatusCode: false,
      body: {
        totalprice: "muito caro"
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([400,500]);
    });
  });

  it('TC11 - Deletar token inválido: Verificar resiliÊncia', () => {
    cy.request({
      method: 'DELETE',
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: 'token=invalido123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('TC12 - Header accept inválido: Testar conformidade', () => {
    cy.request({
      url: `/booking`,
      headers: {
        Accept: 'text/plain'
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200,404,406]);
    });
  });


  it('TC13 - Payload vazio: Garantir que não processe sem dados', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      failOnStatusCode: false,
      body: {}
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });



  //Regras de negócio (Bugs)
  it('TC14 - BUG: Checkout retroativo', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: "Teste",
        lastname: "Bug",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-05-10",
          checkout: "2026-05-01"
        },
        addtionalneeds: "Não"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('TC15 - BUG: Preço negativo', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: "Teste",
        lastname: "Financeiro",
        totalprice: -100,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-05-01",
          checkout: "2026-05-10"
        },
        addtionalneeds: "Não"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('TC16 - BUG: Tipagem de dados', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: "Teste",
        lastname: "Tipagem",
        totalprice: "Um mil",
        depositpaid: true,
        bookingdates: {
          checkin: "2026-05-01",
          checkout: "2026-05-10"
        },
        addtionalneeds: "Não"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });


  //Qualidade, performance e contrato
  it('TC17 - Validar contrato e SLA de resposta (<1000ms)', () => {
    cy.request('/booking').then((response) => {
      expect(response.duration).to.be.lessThan(1000);

      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      if(response.body.length > 0) {
        expect(response.body[0]).to.have.property('bookingid');
      }
    });
  });













});