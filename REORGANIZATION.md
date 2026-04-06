# REORGANIZATION.md

## Padrão escolhido
**MVC Modularizado** (Model-View-Controller) com separação clara entre backend (API/servidor) e frontend (SPA React).

## Estrutura ANTES
- controllers/
- public/
- scripts/
- src/
  - api/
  - components/
  - pages/
  - services/
  - state/
  - main.js
- tests/
- index.html
- script.js
- server.js
- style.css
- config.js
- ...

## Estrutura DEPOIS
- backend/
  - controllers/
    - dataController.js
  - models/
    - dataModel.js (placeholder)
  - routes/
    - dataRoutes.js (placeholder)
  - server.js
  - config/
    - index.js (placeholder)
- frontend/
  - src/
    - components/
      - DataList.js
    - pages/
      - Home.js
    - services/
      - api.js
    - state/
      - store.js
    - main.js
  - public/
    - index.html
    - style.css
    - script.js
- scripts/
  - build.js
  - deploy.js
  - validate.js
- tests/
  - unit/
    - dataController.test.js
    - ...
  - integration/
    - dataFlow.integration.test.js
    - ...
- package.json
- README.md
- ...

## Mudanças realizadas
- Separação total entre backend (Express/MVC) e frontend (React SPA).
- Todos arquivos de backend migrados para `backend/`.
- Todos arquivos de frontend migrados para `frontend/src/` e `frontend/public/`.
- Scripts utilitários mantidos em `scripts/`.
- Testes organizados em `tests/unit` e `tests/integration`.
- Placeholders criados para models, rotas e configs ausentes.
- Imports/Requires atualizados conforme novo caminho.
- Arquivos soltos (index.html, script.js, style.css) movidos para `frontend/public/`.
- Documentação desta reorganização criada em `REORGANIZATION.md`.

## Observações
- O backend está pronto para futura expansão (models, rotas, configs).
- O frontend está isolado e pronto para build/deploy independente.
- Ajustes de import/requires realizados para refletir a nova estrutura.
- Nenhum commit realizado — o agente Git cuidará disso.
