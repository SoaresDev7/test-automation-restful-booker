# Restful-Booker | Cypress Full Stack Automation

Framework híbrido de automação de testes para a aplicação **Shady Meadows** (Restful-Booker),
cobrindo camadas de **API** e **UI** com foco em infraestrutura, observabilidade e rastreabilidade de qualidade.

---

## Stack e Dependências

| Tecnologia | Versão | Função |
| :--- | :--- | :--- |
| **Cypress** | 15.13.0 | Framework core — API e E2E |
| **Faker.js** | 10.4.0 | Geração de massa de dados dinâmica |
| **cypress-plugin-api** | 2.11.2 | Interface visual de depuração HTTP |
| **Mochawesome** | 7.1.4 | Geração de relatórios HTML detalhados |
| **GitHub Actions** | — | Pipeline de CI/CD |
| **Cypress Cloud** | — | Dashboard de execuções e histórico |
| **AWS S3** | — | Persistência pública de relatórios por execução |


---

## Instalação e Execução

**1. Clonar o repositório:**
```bash
git clone https://github.com/SoaresDev7/testes-api-de-reservas.git
cd testes-api-de-reservas
```

**2. Instalar as dependências:**
```bash
npm install
```

**3. Configurar variáveis de ambiente:**

Crie o arquivo `cypress.env.json` na raiz com base no `cypress.env.example.json`.
Este arquivo está no `.gitignore` — nenhuma credencial é exposta no repositório.

```json
{
  "baseUrl": "https://restful-booker.herokuapp.com",
  "platformUrl": "https://automationintesting.online",
  "auth_username": "SEU_USUARIO",
  "auth_password": "SUA_SENHA",
  "token": ""
}
```

**4. Executar os testes:**
```bash
npm test
```

---

## Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run cy:open` | Abre a interface gráfica do Cypress |
| `npm run cy:run` | Executa a suíte em modo *headless* |
| `npm test` | Limpa relatórios anteriores e executa a suíte completa |

---

## Relatórios e Observabilidade

### Mochawesome — Local
Após `npm test`, o relatório é gerado em:
```
cypress/reports/mochawesome_[timestamp].html
```
Cada execução gera seu próprio arquivo com timestamp — nenhuma run sobrescreve outra.
Screenshots de falhas são injetados automaticamente no relatório via hook `test:after:run`.

### AWS S3 — Persistência de Relatórios
O pipeline sincroniza automaticamente os relatórios para um bucket S3 organizado
por `run_id`, garantindo histórico imutável de todas as execuções:

```
http://relatorios-cypress-soaresdev7.s3-website-us-east-1.amazonaws.com/runs/{run_id}/mochawesome.html
```


### Cypress Cloud
Dashboard com histórico de execuções, vídeos, screenshots e análise de estabilidade:

**[Acessar Cypress Cloud →](https://cloud.cypress.io/projects/duhehu/runs)**

---

## CI/CD — GitHub Actions

O pipeline executa automaticamente a cada `push` ou `pull_request` com **três jobs**:
 
**`api-tests`** e **`ui-tests`** rodam em paralelo em máquinas independentes:

1. Checkout do repositório
2. Execução da suíte completa via `cypress-io/github-action@v6` (Chrome, headless)
3. Gravação dos resultados no Cypress Cloud
4. Upload do relatório Mochawesome como artefato da run
5. Sincronização do relatório para AWS S3
6. Log da URL pública do relatório no console da run

> `continue-on-error: true` está configurado intencionalmente — o projeto monitora
> bugs conhecidos ativos, e bloquear o pipeline por falhas esperadas seria contraproducente.
> O pipeline **reporta**, não bloqueia.

---

## Bugs Identificados na API

Durante o desenvolvimento, foram identificadas falhas críticas na API alvo.
Cada bug possui um teste automatizado de monitoramento na suíte:

| ID | Severidade | Descrição | Comportamento Esperado | Status |
| :--- | :--- | :--- | :--- |:-------|
| **BUG-01** | Alta | Aceita checkout anterior ao checkin | `400 Bad Request` | Ativo  |
| **BUG-02** | Crítica | Aceita preço negativo | Rejeitar valor negativo | Ativo  |
| **BUG-03** | Média | Aceita string no campo numérico de preço | `400 Bad Request` | Ativo  |

---

## Uso de IA Estratégica

Este projeto contou com apoio de IA para:
- **Data Factory**: Otimização da lógica de geração de dados para cobertura de edge cases
- **Revisão Técnica**: Identificação de pontos de melhoria (deep merge, schema validation, datas dinâmicas)
- **Documentação**: Estruturação seguindo práticas de mercado

---

## Autor

**Tobias Soares** — Estudante de Ciências da Computação

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tobias-soares-639721364/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SoaresDev7)