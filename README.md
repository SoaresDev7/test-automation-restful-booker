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


##  Uso de Inteligência Artificial

Este projeto utilizou modelos de linguagem avançados como o Gemini e o NotebookLM para acelerar o ciclo de desenvolvimento dos testes. O foco não foi a geração automática de código, mas sim o uso da IA como um revisor técnico e estrategista.

### **Como a IA foi utilizada:**
*   **Consulta direta na documentação da API:** Consulta à documentação da Restful-Book API para otimizar tempo e melhor legibilidade.
*   **Refinamento de nomenclatura:** Padronização dos Test Cases (TCs) seguindo padrões de mercado para melhor legibilidade e manutenção.
*   **Engenharia de Prompt para documentação:** Estruturação de descrições em Markdown para as requisições e para o README, garantindo uma comunicação técnica clara.
*   **Análise de código:** Revisão de scripts de teste para identificar pontos de melhoria em asserções e mensagens de erro personalizadas.
