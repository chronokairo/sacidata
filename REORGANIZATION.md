# Reorganização do Projeto SACIData

## Design Pattern Escolhido
Após análise da stack e estrutura existente, foi decidido adotar o padrão **Modular**. Esse padrão é adequado devido à separação clara de responsabilidades e à necessidade de manter o projeto escalável e organizado.

## Estrutura Anterior
```
backend/
controllers/
docs/
frontend/
scripts/
src/
tests/
BUG_FIXES_GUIDE.md
config.js
docker-compose.yml
Dockerfile
EMERGENCY_FIX.md
FINAL_CODE_REVIEW_DECISION.md
FINAL_CODE_REVIEW.md
jest.config.js
LICENSE
package.json
PIPELINE_CE6C7B8C.md
QA_BUG_REPORT_DETAILED.md
QA_COVERAGE_REPORT.md
QA_TEST_REPORT.md
README.md
REORGANIZATION.md
requirements_and_backlog_emergencial.md
requirements_and_backlog_git_commit.md
requirements_and_backlog_sacidata_pipeline.md
requirements_and_backlog_sacidata.md
requirements_and_backlog.md
run_qa_tests.sh
run_tests.sh
server.js
technical_architecture_git_commit.md
technical_architecture_sacidata.md
technical_architecture.md
todo.md
```

## Estrutura Atualizada
```
config/
  config.js
  jest.config.js
  docker-compose.yml
  Dockerfile

src/
  app/
    controllers/
    services/
    models/
  scripts/
    move-md-to-docs.js
    validate.js
  server.js

docs/
  (todos os arquivos .md movidos para cá)

tests/
  unit/
  integration/

scripts/
  README.md

package.json
README.md
LICENSE
```

## Mudanças Realizadas
1. **Organização de Configurações**:
   - Arquivos de configuração (`config.js`, `jest.config.js`, `docker-compose.yml`, `Dockerfile`) movidos para a pasta `config/`.

2. **Centralização do Código-Fonte**:
   - Todo o código principal foi movido para `src/`.
   - Scripts específicos foram movidos para `src/scripts/`.

3. **Documentação**:
   - Todos os arquivos `.md` foram movidos para a pasta `docs/`.

4. **Testes**:
   - Testes unitários e de integração organizados em `tests/unit/` e `tests/integration/`.

5. **Correção de Imports**:
   - Todos os imports/requires foram atualizados para refletir a nova estrutura.

6. **Remoção de Arquivos Soltos**:
   - Arquivos desorganizados na raiz foram movidos para suas respectivas pastas.

## Próximos Passos
- Validar a execução do projeto com a nova estrutura.
- Atualizar a documentação de desenvolvimento no `README.md`.