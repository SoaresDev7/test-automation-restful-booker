# Test Automation Project: Restful-Booker API
Este projeto apresenta uma suíte de testes automatizados para a **Restful-Booker API**, utilizando **Postman** e **JavaScript**. O foco principal foi garantir a integridade dos dados, validar regras de negócio e identificar vulnerabilidades de segurança e performance.

## Tecnologias Utilizadas
*   **Postman**: Criação e execução da suíte de testes.
*   **JavaScript (Chai.js)**: Scripts de validação e asserções.
*   **Collection Runner**: Execução em lote dos cenários de teste.
*   **JSON Schema**: Validação de contrato de dados.

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

## Casos de Teste Implementados (TC)

### **1. Suíte de Configuração & Smoke Tests**
*   **TC01 - Health Check (Ping):** Verifica se o servidor está online e respondendo (Status 201).
*   **TC02 - Geração de Token:** Valida a autenticação bem-sucedida do administrador.

### **2. Fluxo Funcional (CRUD - Caminho Feliz)**
*   **TC03 - Criar Reserva Válida:** Valida a criação de reservas com dados íntegros e datas futuras.
*   **TC04 - Consulta por ID:** Garante que os dados salvos no banco estão idênticos ao enviado no POST.
*   **TC05 - Atualização (PUT):** Testa a edição completa de uma reserva existente com token de acesso.
*   **TC06 - Exclusão (DELETE):** Valida a remoção definitiva de uma reserva do sistema.

### **3. Negativos, Segurança & Edge Cases**
*   **TC07 - ID Inexistente (GET):** Valida retorno 404 para recursos não encontrados.
*   **TC08 - Falta de Token (PUT):** Garante proteção contra alterações não autorizadas (403).
*   **TC09 - Token Inválido (DELETE):** Testa a resiliência do sistema contra tokens malformados.
*   **TC10 - Payload Vazio (POST):** Verifica se a API bloqueia criações sem corpo de dados.
*   **TC11 - Header Accept Errado:** Testa a negociação de conteúdo e retorno de erro de protocolo.
*   **TC12 - Data Retroativa:** Identifica falha na lógica de check-in vs checkout.
*   **TC13 - Preço Negativo:** Identifica falha na validação de valores monetários.
*   **TC14 - Tipagem de Dados:** Testa se o sistema aceita Strings em campos numéricos (Sanity Check).

### **4. Performance & Contrato**
*   **TC15 - SLA de Resposta:** Monitoramento de latência garantindo respostas em menos de **1000ms**.
