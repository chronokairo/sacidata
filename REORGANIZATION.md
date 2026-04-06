# Reorganização de Arquivos do Projeto Sacidata

## Padrão Escolhido

O padrão de organização adotado para este projeto é o **MVC (Model-View-Controller)**, conforme já identificado na estrutura existente. Este padrão é adequado devido à separação clara entre responsabilidades no backend e frontend, além de ser amplamente utilizado em projetos com Node.js e React.js.

## Estrutura Antes

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
|-- docs/
|   |-- (alguns arquivos .md já estavam aqui)
|
|-- scripts/
|-- Dockerfile
|-- (vários arquivos .md soltos na raiz)
```

## Estrutura Após

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
|-- docs/
|   |-- BUG_FIXES_GUIDE.md
|   |-- EMERGENCY_FIX.md
|   |-- FINAL_CODE_REVIEW_DECISION.md
|   |-- FINAL_CODE_REVIEW.md
|   |-- PIPELINE_CE6C7B8C.md
|   |-- QA_BUG_REPORT_DETAILED.md
|   |-- QA_COVERAGE_REPORT.md
|   |-- QA_TEST_REPORT.md
|   |-- README.md
|   |-- REORGANIZATION.md
|   |-- requirements_and_backlog_emergencial.md
|   |-- requirements_and_backlog_git_commit.md
|   |-- requirements_and_backlog.md
|   |-- technical_architecture_git_commit.md
|   |-- technical_architecture_sacidata.md
|   |-- technical_architecture.md
|   |-- todo.md
|
|-- scripts/
|-- Dockerfile
```

## Mudanças Realizadas

1. **Movimentação de Arquivos `.md`:**
   - Todos os arquivos `.md` que estavam na raiz foram movidos para a pasta `docs/`.

2. **Atualização de Referências:**
   - Não foram identificadas referências internas entre os arquivos `.md` que necessitassem de atualização.

3. **Criação de Estrutura Padrão:**
   - A estrutura existente já estava bem organizada, seguindo o padrão MVC. Apenas ajustes menores foram necessários.

## Validação

- Todos os arquivos `.md` estão agora centralizados na pasta `docs/`.
- A estrutura do projeto permanece consistente com o padrão MVC.
- Não há arquivos `.md` soltos na raiz ou em locais inadequados.

---

Responsável: Organizer — ThinkCoffee
Data: 2024-06-13