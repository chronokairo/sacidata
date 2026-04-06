# Arquitetura e Estrutura de Pastas do Projeto Sacidata

## Stack Tecnológica

- **Frontend**: React.js
- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB
- **Testes**: Jest para testes unitários e Cypress para testes end-to-end
- **Containerização**: Docker
- **CI/CD**: GitHub Actions

## Estrutura de Pastas

A estrutura proposta segue o padrão MVC (Model-View-Controller) com separação clara entre frontend e backend:

```
/
|-- backend/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- tests/
|   |-- app.js
|   |-- server.js
|
|-- frontend/
|   |-- src/
|       |-- components/
|       |-- pages/
|       |-- state/
|       |-- api/
|       |-- tests/
|       |-- index.js
|
|-- config/
|   |-- default.json
|   |-- production.json
|   |-- development.json
|
|-- scripts/
|-- Dockerfile
|-- docker-compose.yml
|-- README.md
|-- package.json
|-- .env
|-- .env.example
```

## Detalhamento das Pastas

### Backend
- **controllers/**: Contém a lógica de controle, manipulando as requisições e respostas.
- **models/**: Define os esquemas e modelos do banco de dados.
- **routes/**: Define as rotas da API.
- **services/**: Contém a lógica de negócios e integração com outros serviços.
- **tests/**: Testes unitários e de integração para o backend.
- **app.js**: Configuração principal do aplicativo Express.
- **server.js**: Inicialização do servidor.

### Frontend
- **components/**: Componentes reutilizáveis da interface.
- **pages/**: Páginas principais da aplicação.
- **state/**: Gerenciamento de estado (ex: Redux, Context API).
- **api/**: Configuração de chamadas à API.
- **tests/**: Testes unitários e de integração para o frontend.
- **index.js**: Ponto de entrada da aplicação React.

### Config
- Arquivos de configuração para diferentes ambientes (desenvolvimento, produção, etc).

### Scripts
- Scripts utilitários para automação de tarefas.

## Padrões de Organização

1. **Nomenclatura**:
   - Pastas e arquivos em `kebab-case`.
   - Classes e componentes em `PascalCase`.

2. **Modularização**:
   - Cada módulo deve ser autocontido, com seus próprios testes.

3. **Configuração**:
   - Variáveis de ambiente centralizadas em `.env`.

4. **Testes**:
   - Testes devem ser organizados na mesma estrutura dos arquivos de código.

---

Essa estrutura visa facilitar a manutenção, escalabilidade e colaboração no projeto.