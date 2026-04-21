# Test Automation Project: Restful-Booker API
Este projeto apresenta uma suíte de testes automatizados para a **Restful-Booker API**, utilizando uma abordagem híbrida com **Postman** e **Cypress**. O foco principal foi garantir a integridade dos dados, validar regras de negócio e identificar vulnerabilidades de segurança e performance em camadas distintas.

## Tecnologias Utilizadas
*   **Postman**: Criação e execução da suíte de testes.
*   **Cypress**: Automação de testes de API end-to-end (E2E) e fluxos críticos.
*   **JavaScript (Chai.js)**: Scripts de validação e asserções.
*   **Collection Runner**: Execução em lote dos cenários de teste.
*   **JSON Schema**: Validação de contrato de dados.
*   **Node.js**: Ambiente de execução para as dependências de automação.

## Estrutura do Repositório
O projeto foi organizado para demonstrar versatilidade no uso de ferramentas de QA:
*   `postman/` : Contém a Collection e o Environment prontos para a importação.
*   `cypress/` : Contém os scripts de automação (`/e2e/booking_api.cy.js`) e configurações.
*   `README.md` : Documentação técnica e relatórios de bugs.

## Estratégia de Testes
A suíte foi dividida em três camadas principais para garantir uma cobertura de 360°:
1.  **Smoke Tests**: Validação de saúde da API (Health Check) e Autenticação.
2.  **Contract & Functional Tests (CRUD)**: Garantia de que as operações básicas funcionam conforme o esperado.
3.  **Negative & Edge Cases**: Testes de resiliência, enviando dados inválidos, tipos incorretos e fluxos fora da ordem lógica.

---

## Relatório de Bugs Encontrados
Durante a automação, identifiquei comportamentos divergentes da documentação oficial e falhas de validação no Back-end:

| ID | Severidade | Descrição | Comportamento Esperado | Comportamento Atual |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | **Alta** | Falha na Regra de Negócio: Datas Retroativas. | Status `400 Bad Request`. | Status `200 OK` (Checkout < Checkin). |
| **BUG-02** | **Crítica** | Vulnerabilidade Financeira: Preço Negativo. | Rejeitar valor negativo. | Status `200 OK` (Aceita `-111`). |
| **BUG-03** | **Média** | Falha de Tipagem. | Erro de Tipo (400). | Status `200 OK` (Aceita String no Preço). |
| **BUG-04** | **Baixa** | Divergência de Documentação (Accept Header). | Status `418 I'm a teapot`. | Status `404 Not Found`. |

---
## Tabela de Cobertura de Endpoints

| Método | Endpoint | Recurso | Coberto? |
| :--- | :--- | :--- | :--- |
| GET | /ping | Health Check | ✅ |
| POST | /auth | Autenticação | ✅ |
| GET | /booking | Listagem de Reservas | ✅ |
| GET | /booking/:id | Detalhes da Reserva | ✅ |
| POST | /booking | Criação de Reserva | ✅ |
| PUT | /booking/:id | Atualização Total | ✅ |
| PATCH | /booking/:id | Atualização Parcial | ✅ |
| DELETE | /booking/:id | Exclusão de Reserva | ✅ |

---

## Casos de Teste Implementados (TC)

### **1. Suíte de Configuração & Smoke Tests**
* **TC01 - Health Check:** Verifica a disponibilidade do servidor (Status 201).
* **TC02 - Gerar Token:** Valida a autenticação e armazena a credencial para operações privadas.
* **TC03 - Login Inválido:** Garante que a API bloqueia acessos com credenciais incorretas.

### **2. Fluxo Funcional**
* **TC04 - Criar Reserva:** Valida a criação de novos registros e captura o `bookingid`.
* **TC05 - Consultar Reserva por ID:** Garante a persistência dos dados e validação do contrato (JSON Schema).
* **TC06 - Atualizar Reserva:** Testa a edição completa (PUT) de uma reserva existente.
* **TC07 - Deletar Reserva:** Valida a remoção definitiva do registro do sistema.

### **3. Negativos, Segurança & Edge Cases**
* **TC08 - Consulta ID Inexistente:** Valida o tratamento de erro 404 para buscas sem sucesso.
* **TC09 - Atualização Sem Token:** Garante a proteção de endpoints privados contra acessos não autorizados.
* **TC10 - Criar Dado Inválido:** Testa a robustez do sistema contra entradas malformadas.
* **TC11 - Deletar Token Inválido:** Verifica a resiliência contra tokens expirados ou incorretos.
* **TC12 - Header Accept Errado:** Testa a negociação de conteúdo e conformidade com protocolos.
* **TC13 - Payload Vazio:** Garante que a API não processe requisições sem corpo de dados.

### **4. Regras de Negócio (Bugs Identificados)**
* **TC14 - Checkout Retroativo:** Identifica falha lógica onde a API aceita datas de saída anteriores à entrada.
* **TC15 - Preço Negativo:** Identifica falha na validação de integridade financeira para valores monetários.
* **TC16 - Tipagem de Dados:** Identifica erro de sanidade ao aceitar Strings em campos numéricos.

### **5. Qualidade, Performance & Contrato**
* **TC17 - Validar Contrato JSON Schema:** Garante que a estrutura da resposta está conforme a documentação.
* **SLA de Resposta:** Monitoramento global de latência garantindo respostas em menos de **1000ms**.

---

## Como Executar

### Via Postman
1. Importe os arquivos da pasta `/postman` para o seu workspace.
2. Selecione o ambiente `Hospedagem`.
3. Utilize o **Collection Runner** para executar todos os TCs em lote.

### Via Cypress
1. Clone o repositório e acesse a pasta raiz.
2. Instale as dependências: `npm install`.
3. Execute os testes:
  * Interface Gráfica: `npx cypress open`
  * Modo Headless: `npx cypress run`

---

##  Uso de Inteligência Artificial

Este projeto utilizou modelos de linguagem avançados como o Gemini e o NotebookLM para acelerar o ciclo de desenvolvimento dos testes. O foco não foi a geração automática de código, mas sim o uso da IA como um revisor técnico e estrategista.

### **Como a IA foi utilizada:**
*   **Consulta direta na documentação da API:** Consulta à documentação da Restful-Book API para otimizar tempo e melhor legibilidade.
*   **Refinamento de nomenclatura:** Padronização dos Test Cases (TCs) seguindo padrões de mercado para melhor legibilidade e manutenção.
*   **Engenharia de Prompt para documentação:** Estruturação de descrições em Markdown para as requisições e para o README, garantindo uma comunicação técnica clara.
*   **Análise de código:** Revisão de scripts de teste para identificar pontos de melhoria em asserções e mensagens de erro personalizadas.

---

## Próximos passos e Evolução

Minha meta é aprofundar a automação em nível de código, elevando a robustez dos testes para o ecossistema Java:
* **Migração para Java:** O próximo marco deste projeto é a implementação da suíte utilizando Java. O objetivo é aplicar os 17 TCs em uma estrutura de código fortemente tipada, demonstrando domínio em automação de alto nível para integração contínua.
* **Implementação de Reports Avançados:** Integrar dashboards profissionais para facilitar a leitura de resultados por stakeholders e times de desenvolvimento.

---

## Autor

### Tobias Soares
*Estudante de Ciências da Computação*

[GitHub](https://www.google.com/search?q=https://github.com/SoaresDev7) | [LinkedIn](https://www.linkedin.com/in/tobias-soares-639721364/)
