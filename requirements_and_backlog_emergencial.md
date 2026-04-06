# Plano Emergencial e Backlog Priorizado - SACIDATA

## 1. Objetivo
Identificar e detalhar as ações emergenciais necessárias no repositório, definir critérios de aceite e priorizar o backlog para restaurar a segurança, integridade e continuidade do projeto.

---

## 2. Requisitos Emergenciais

### REQ-01: Corrigir validação do campo `value` em `dataController`
- **Descrição:** O endpoint aceita tipos inválidos para `value` (deve ser número).
- **Critério de aceite:** POST com `value` não-numérico retorna erro 400.

### REQ-02: Corrigir path traversal em `server.js`
- **Descrição:** Possível acesso a arquivos fora do diretório raiz via symlinks.
- **Critério de aceite:** Nenhum arquivo fora do root pode ser servido, mesmo com symlinks.

### REQ-03: Implementar autenticação nos endpoints `/api/data`
- **Descrição:** Endpoints expostos sem autenticação.
- **Critério de aceite:** Apenas usuários autenticados acessam `/api/data`.

### REQ-04: Validar e sanitizar campo `name` em `dataController`
- **Descrição:** Aceita strings vazias ou apenas espaços.
- **Critério de aceite:** POST com `name` vazio ou só espaços retorna erro 400.

### REQ-05: Adicionar headers CORS em `server.js`
- **Descrição:** Falta de CORS bloqueia integrações frontend-backend.
- **Critério de aceite:** Requisições cross-origin funcionam sem erro de CORS.

### REQ-06: Implementar rate limiting nos endpoints
- **Descrição:** API vulnerável a DoS.
- **Critério de aceite:** Após 100 requisições em 15min, retorna 429.

### REQ-07: Remover `console.log` em produção
- **Descrição:** Logs sensíveis podem vazar.
- **Critério de aceite:** Em produção, logs só via logger estruturado.

---

## 3. Backlog Priorizado (Emergencial)

| Prioridade | Tarefa                                                        | Critério de Aceite                      |
|------------|---------------------------------------------------------------|-----------------------------------------|
| P0         | Corrigir validação de `value` em `dataController`             | POST inválido retorna 400               |
| P0         | Corrigir path traversal em `server.js`                        | Não serve arquivos fora do root         |
| P1         | Implementar autenticação JWT nos endpoints `/api/data`        | Endpoints protegidos por token          |
| P1         | Validar e sanitizar campo `name`                              | POST vazio retorna 400                  |
| P1         | Adicionar headers CORS                                        | Frontend acessa backend sem erro        |
| P1         | Implementar rate limiting                                     | 429 após 100 reqs/15min                 |
| P2         | Remover `console.log` em produção                             | Só logger estruturado em prod           |

---

## 4. Critérios Gerais de Aceite
- Todos os testes unitários e de integração devem passar.
- Cobertura mínima de testes: 70%.
- Nenhum bug crítico aberto no QA.
- Documentação atualizada após cada correção.

---

## 5. Referências
- QA_BUG_REPORT_DETAILED.md
- QA_COVERAGE_REPORT.md
- FINAL_CODE_REVIEW.md

---

**Responsável:** Product Manager - ThinkCoffee
**Data:** 2024-06
