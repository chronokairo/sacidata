# Emergency fix — dependencies

Motivação:
- src/api/controllers/dataController.js usa `uuid` e `sanitize-html`, mas package.json não listava essas dependências. Isso quebra o deploy/build.

Ações aplicadas:
1. Adicionado `uuid` e `sanitize-html` em `package.json` como dependências de runtime.
2. Commit e push em branch feature/emergency-fix-9f8b7c6a.
3. PR deve ser aberto para `main` e merge realizado.
4. Deploy executado localmente via `npm run deploy`.

Notas:
- Se CI instalar dependências automaticamente, o build deverá passar.
- Se falhar push por autenticação, crie PR manualmente e execute deploy no ambiente de CI/CD.
