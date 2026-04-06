# Reorganização do Projeto Sacidata

## Padrão Escolhido
O padrão escolhido para a reorganização do projeto é o **MVC (Model-View-Controller)**, que permite uma separação clara de responsabilidades e facilita a manutenção e escalabilidade do código.

## Estrutura Antes
```
backend/
controllers/
frontend/
public/
scripts/
src/
tests/
...
```

## Estrutura Depois
```
src/
  ├── controllers/
  │   └── dataController.js
  ├── models/
  │   └── dataModel.js
  ├── routes/
  │   └── dataRoutes.js
  ├── tests/
  │   └── dataController.test.js
  ├── index.js
  ├── config.js
  ├── Dockerfile
  └── docker-compose.yml
```

## Lista de Mudanças
- Criadas pastas para `controllers`, `models`, `routes` e `tests` dentro de `src`.
- Moved `dataController.js`, `dataModel.js`, e `dataRoutes.js` para suas respectivas pastas.
- Criado arquivo `index.js` como ponto de entrada da aplicação.
- Atualizados os caminhos de importação nos arquivos movidos.
- Criados arquivos de configuração e Docker no diretório `src`.