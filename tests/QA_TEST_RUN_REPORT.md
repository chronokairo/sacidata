# Relatório de Testes de Integridade

Resultados:
- PASS - getData retorna array e status
- PASS - createData cria item válido
- PASS - createData retorna 400 quando name ausente
- PASS - createData retorna 400 quando value ausente
- PASS - createData aceita value = 0
- PASS - createData rejeita value não numérico
- PASS - fetchData retorna dados quando ok
- PASS - fetchData lança erro quando não ok
- PASS - fetchData rejeita se fetch falhar