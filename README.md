# Restful-Booker API Automation | Cypress Full Stack

Este projeto apresenta uma solução robusta de automação de testes para a **Restful-Booker API**, utilizando o ecossistema moderno do Cypress. O foco principal é demonstrar maturidade técnica em QA, validando fluxos críticos de reserva com dados dinâmicos, validação de contratos e integração contínua.

## Tecnologias e Dependências

* **Cypress (v15.13.0)**: Framework core para automação de API.
* **[Faker.js](https://fakerjs.dev/)**: Geração de massa de dados dinâmica para garantir testes variados.
* **Cypress Plugin API**: Interface visual integrada para depuração das requisições HTTP.
* **Mochawesome**: Gerador de relatórios HTML detalhados.
* **GitHub Actions**: Pipeline de CI/CD para execução automatizada a cada Push ou Pull Request.
* **[Cypress Cloud](https://cloud.cypress.io/)**: Dashboard para monitoramento de execuções, vídeos e performance.

---

## Estrutura de Scripts (`package.json`)

| Comando | Descrição |
| :--- | :--- |
| `npm run cy:open` | Abre a interface gráfica do Cypress. |
| `npm run cy:run` | Executa os testes em modo *headless*. |
| `npm test` | **Fluxo Completo**: Limpa relatórios antigos e executa a suíte local. |

---
## Instalação e Execução

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/SoaresDev7/testes-api-de-reservas.git](https://github.com/SoaresDev7/testes-api-de-reservas.git)
    cd testes-api-de-reservas
    ```

2.  **Instalar as dependências:**
    ```bash
    npm install
    ```

3.  **Configurar variáveis de ambiente:**
    Crie o ficheiro `cypress.env.json` na raiz do projeto (baseie-se no `cypress.env.example.json`). Este ficheiro está no `.gitignore` para proteger dados sensíveis.

4.  **Executar os testes:**
    ```bash
    npm test
    ```
---
## Relatórios e Observabilidade

### Mochawesome
Após a execução do comando `npm test`, um relatório rico em detalhes é gerado em:
`cypress/reports/mochawesome.html`

### Cypress Cloud
A integração com a nuvem permite:
* Visualização de vídeos e capturas de ecrã das execuções.
* Análise de tempo de resposta (SLA) por endpoint.
* Deteção de testes *flaky* (instáveis).

Os resultados das execuções, logs detalhados e métricas podem ser visualizados publicamente aqui:  
    **[Link para o Projeto no Cypress Cloud](https://cloud.cypress.io/projects/duhehu/runs)**

---

## CI/CD: GitHub Actions
O projeto está configurado para rodar automaticamente em cada atualização. O workflow realiza:
1. Setup do ambiente Node.js.
2. Instalação de dependências.
3. Execução dos testes em paralelo.
4. Upload dos resultados para o Cypress Cloud.

---

## Report de Bugs Encontrados
Durante o desenvolvimento desta automação, identificamos falhas críticas na API:

| ID | Severidade | Descrição | Comportamento Esperado | Status |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | **Alta** | Regra de Data: Aceita Checkout anterior ao Checkin. | `400 Bad Request` | ❌ Falhou |
| **BUG-02** | **Crítica** | Financeiro: Aceita preço negativo. | Rejeitar valor negativo | ❌ Falhou |
| **BUG-03** | **Média** | Tipagem: Aceita String no campo de preço. | `400 Bad Request` | ❌ Falhou |
| **BUG-04** | **Baixa** | Negociação de Conteúdo: Falha no Header `Accept`. | `418 I'm a teapot` | ❌ Falhou |

---

## Uso de IA Estratégica
Este projeto contou com o apoio de modelos de IA para:
* **Data Factory**: Otimização da lógica para cobertura de *edge cases*.
* **Revisão Técnica**: Melhoria na estrutura dos scripts de limpeza de ambiente.
* **Documentação**: Estruturação deste README seguindo as melhores práticas de mercado.

## Autor

**Tobias Soares** - Estudante de Ciências da Computação

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tobias-soares-639721364/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SoaresDev7)
