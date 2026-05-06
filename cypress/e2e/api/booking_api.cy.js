describe('API RestFul-Booker - Suíte completa', () => {

  beforeEach(() => {
    cy.session('adminSession', () => {
        cy.getTokenApi();
    }, {
        validate() {
            if (!Cypress.env('token')) {
                cy.getTokenApi();
            }
        }
    });
  });

  context('Fluxo funcional - Gestão de reservas (CRUD)', () => {
    it('TC04/05/17 - Deve criar reserva e validar contrato de dados', () => {
        cy.createBookingApi().then((res) => {
          const payload = res.body.booking;

          expect(res.status).to.eq(200);
          expect(res.duration).to.be.lessThan(1000);

          const bookingId = res.body.bookingid;

          cy.validateBookingSchema(res.body.booking);

          cy.api(`/booking/${bookingId}`)
              .its('body.firstname')
              .should('eq', payload.firstname);
        });
    });

    it('TC06 - Deve atualizar uma reserva existente com novos dados dinâmicos', () => {
      cy.createBookingApi().then((res) => {
        const id = res.body.bookingid;
        const payload = res.body.booking;

          cy.api({
            method: 'PUT',
            url: `/booking/${id}`,
            headers: { Cookie: `token=${Cypress.env('token')}` },
            body: payload
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.firstname).to.eq(payload.firstname);
          });
      });
    });
  });

  context('Negativos e Segurança - Resiliência do sistema', () => {
    it('TC08 a TC13 - Deve validar tratamento de erros e permissões', () => {
      cy.createBookingApi().then((res) => {
        const tempId = res.body.bookingid;

        const securityCases = [
          { id: 'TC08', url: '/booking/99999', method: 'GET', status: 404 },
          { id: 'TC09', url: `/booking/${tempId}`, method: 'PUT', status: 403, body: { firstname: "Hacker" } },
          { id: 'TC11', url: `/booking/${tempId}`, method: 'DELETE', status: 403, headers: { Cookie: 'token=123' } },
          { id: 'TC13', url: '/booking', method: 'POST', status: 500, body: {} }
        ];

        securityCases.forEach((c) => {
          it(`${c.id} - Deve retornar ${c.status} para ${c.method} ${c.url}`, () => {
            cy.api({ ...c, failOnStatusCode: false })
                .its('status').should('eq', c.status);
          });
        });
      });
    });
  });

  context('Regras de Negócio - Monitoramento de Bugs conhecidos', () => {
    const bugs = [
      { id: 'TC14', desc: 'Checkout retroativo', data: { bookingdates: { checkin: "2026-05-10", checkout: "2026-05-01" } } },
      { id: 'TC15', desc: 'Preço negativo', data: { totalprice: -100 } },
      { id: 'TC16', desc: 'Tipagem de dados', data: { totalprice: "String inválida" } }
    ];

    bugs.forEach((bug) => {
      it(`${bug.id} - Bug Track: ${bug.desc}`, () => {
        cy.createBookingApi(bug.data).then((res) => {
          expect(res.status).to.not.eq(200, `ALERTA: API aceitou ${bug.desc}. O bug ainda está ativo no ambiente.`);
        });
      });
    });
  });
});