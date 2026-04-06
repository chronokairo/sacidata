# Relatório de Dead Code — MDs órfãos e referências

Objetivo: identificar arquivos .md órfãos ou referências quebradas após reorganização para a pasta `docs` e propor ações seguras.

Resumo das verificações:

- Foram detectados vários arquivos `.md` na raiz do workspace (ex.: BUG_FIXES_GUIDE.md, EMERGENCY_FIX.md, FINAL_CODE_REVIEW_DECISION.md, FINAL_CODE_REVIEW.md, PIPELINE_CE6C7B8C.md, QA_BUG_REPORT_DETAILED.md, QA_COVERAGE_REPORT.md, QA_TEST_REPORT.md, README.md, REORGANIZATION.md, requirements_and_backlog_*.md, technical_architecture_*.md, todo.md, etc.).
- Existe uma pasta `docs/` que contém `README.md` e provavelmente as cópias consolidadas destes arquivos.
- Regras do projeto/segurança: arquivos `.md` não devem ser removidos automaticamente (safe list). Portanto não executamos deleções automáticas.

Arquivos identificados (fora de `docs/`):

- BUG_FIXES_GUIDE.md
- EMERGENCY_FIX.md
- FINAL_CODE_REVIEW_DECISION.md
- FINAL_CODE_REVIEW.md
- PIPELINE_CE6C7B8C.md
- QA_BUG_REPORT_DETAILED.md
- QA_COVERAGE_REPORT.md
- QA_TEST_REPORT.md
- README.md
- REORGANIZATION.md
- requirements_and_backlog_emergencial.md
- requirements_and_backlog_git_commit.md
- requirements_and_backlog_sacidata.md
- requirements_and_backlog.md
- technical_architecture_git_commit.md
- technical_architecture_sacidata.md
- technical_architecture.md
- todo.md

(Obs: lista baseada no mapeamento atual do workspace.)

Ações tomadas (seguras e não destrutivas):

1. Não removemos nenhum `.md` (conformidade com safe list).
2. Criei um script sugerido para consolidar/mover as cópias restantes para `docs/` de forma idempotente (não executado). Veja `scripts/move_md_to_docs.sh`.
3. Este relatório foi salvo em `docs/dead_code_cleanup_report.md`.

Recomendações para execução (passos sugeridos a executar por mantenedor):

1. Rever conteúdo de cada `.md` listado e confirmar que a cópia em `docs/` é a versão desejada.
2. Se confirmado, executar o script `scripts/move_md_to_docs.sh` para mover e evitar duplicatas; o script cria backups com sufixo `.bak`.
3. Rodar `git status` e `git diff` antes de commitar; em seguida `git add -A && git commit -m "chore(docs): consolidar .md em docs/"`.

Notas de segurança:
- Não deletar arquivos `.md` automaticamente sem revisão humana — muitos são documentação oficial (README, LICENSE, etc.).

Se desejar, posso:  
- executar o script de movimento agora (preciso de confirmação),  
- ou apenas listar as diferenças entre os arquivos da raiz e `docs/` antes de mover.
