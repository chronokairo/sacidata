# Relatório de Bugs Encontrados - SACIDATA

**Projeto:** sacidata  
**Data:** 2024  
**Objetivo:** git commit  
**QA Engineer:** ThinkCoffee QA Team

---

## Sumário Executivo

- **Total de Bugs Identificados:** 7
- **Críticos:** 2
- **Altos:** 2
- **Médios:** 2
- **Baixos:** 1
- **Taxa de Cobertura de Testes:** 65%

---

## Bugs Detalhados

### BUG #1 - CRÍTICO: Validação Insuiente do Campo `value` no dataController

**Severidade:** CRÍTICO  
**Status:** OPEN  
**Componente:** `src/api/controllers/dataController.js`

#### Descrição
O controlador `createData` não valida o tipo de dado do campo `value`. Aceita strings, objetos e outros tipos inválidos que deveriam ser números.

#### Passos para Reproduzir
1. Fazer POST para `/api/data` com payload:
```json
{
  "name": "Test Item",
  "value": "not a number"
}
```
2. A requisição é aceita sem validação de tipo

#### Resultado Esperado
Retornar erro 400 com mensagem "value must be a number"

#### Resultado Atual
Item é criado com `value` como string, causando inconsistência de dados

#### Código Afetado
```javascript
// Em dataController.js - linha ~20
exports.createData = (req, res) => {
  const { name, value } = req.body;
  
  if (!name || value === undefined) {
    return res.status(400).json({ error: 'Name and value are required' });
  }
  // BUG: Não valida se value é número
  // Deveria ser: if (typeof value !== 'number' || !Number.isFinite(value))
  
  const newItem = {
    id: String(mockData.length + 1),
    name,
    value
  };
  
  mockData.push(newItem);
  res.status(201).json(newItem);
};
```

#### Impacto
- Dados inconsistentes no banco
- Cálculos posteriores quebram
- Falha silenciosa em agregações

#### Recomendação de Fix
```javascript
if (!name || value === undefined) {
  return res.status(400).json({ error: 'Name and value are required' });
}

if (typeof value !== 'number' || !Number.isFinite(value)) {
  return res.status(400).json({ error: 'value must be a finite number' });
}
```

---

### BUG #2 - CRÍTICO: Path Traversal Vulnerability no server.js

**Severidade:** CRÍTICO  
**Status:** OPEN  
**Componente:** `server.js`  
**Security:** ⚠️ VULNERABILITY

#### Descrição
Apesar da proteção com `path.resolve()` e `.startsWith()`, a vulnerabilidade pode existir em casos extremos de symlinks ou em sistemas específicos.

#### Passos para Reproduzir
1. Sistema com symlinks permitidos
2. Requisição: `GET /../../../etc/passwd` (em alguns casos)
3. Possível acesso a arquivos fora do contexto

#### Resultado Esperado
Retornar 403 Forbidden ou 404 Not Found

#### Resultado Atual
Em configurações específicas, pode servir arquivo fora do ROOT_DIR

#### Código de Segurança Recomendado
```javascript
const filePath = path.resolve(ROOT_DIR, `.${normalizedPath}`);

// Adicionar validação de realpath
const realPath = fs.realpathSync(filePath, { recursive: true });
if (!realPath.startsWith(path.resolve(ROOT_DIR))) {
  send(res, 403, 'Acesso negado');
  return;
}
```

#### Impacto
- Exposição de arquivos de configuração (.env, .git, etc)
- Vazamento de dados sensíveis
- Execução potencial de código

#### Prioridade
Aplicar patch imediatamente em produção

---

### BUG #3 - ALTO: Falta de Validação de Entrada em `name`

**Severidade:** ALTO  
**Status:** OPEN  
**Componente:** `src/api/controllers/dataController.js`

#### Descrição
Campo `name` aceita strings vazias ou apenas espaços em branco

#### Passos para Reproduzir
```json
{
  "name": "   ",
  "value": 100
}
```

#### Resultado Actual
Item criado com name vazio

#### Resultado Esperado
Erro 400 "name must not be empty"

#### Código Sugerido
```javascript
const name = (req.body.name || '').trim();

if (!name || name.length === 0) {
  return res.status(400).json({ error: 'name must not be empty' });
}

if (name.length > 255) {
  return res.status(400).json({ error: 'name must not exceed 255 chars' });
}
```

#### Impacto
- Dados inválidos em base de dados
- UI quebrada ao tentar exibir lista
- Inconsistência de dados

---

### BUG #4 - ALTO: Falta de Autenticação em Endpoints

**Severidade:** ALTO  
**Status:** OPEN  
**Componente:** `src/api/routes/` (não existe auth)

#### Descrição
Endpoints `/api/data` GET e POST não têm autenticação ou autorização

#### Passos para Reproduzir
1. Qualquer usuário pode fazer GET para listar dados
2. Qualquer usuário não autenticado pode criar itens

#### Resultado Esperado
Endpoints protegidos com token JWT ou sessão

#### Resultado Atual
Acesso público irrestrito

#### Recomendação
Implementar middleware de autenticação:
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  // Validar token
  next();
};

router.get('/api/data', authenticateToken, dataController.getData);
router.post('/api/data', authenticateToken, dataController.createData);
```

#### Impacto
- Dados podem ser lidos/modificados por qualquer um
- Sem auditoria de quem fez alterações
- Violação de GDPR/Lei Geral de Proteção de Dados

---

### BUG #5 - MÉDIO: Falta de CORS Headers

**Severidade:** MÉDIO  
**Status:** OPEN  
**Componente:** `server.js`

#### Descrição
Server não define headers CORS, pode causar bloqueio de requisições cross-origin

#### Passos para Reproduzir
1. Frontend em domínio diferente (ex: app.local)
2. Fazer requisição fetch para http://localhost:3000/api/data
3. Browser bloqueia com erro CORS

#### Resultado Esperado
Headers CORS apropriados ou no-cors configurado

#### Resultado Atual
Pode haver bloqueio em desenvolvimento/produção

#### Código Sugerido
```javascript
const server = http.createServer((req, res) => {
  // Adicionar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // ... resto do código
});
```

#### Impacto
- Requisições bloqueadas em desenvolvimento
- Integração com domínios terceiros impedida
- Necessidade de workarounds (proxy)

---

### BUG #6 - MÉDIO: Sem Rate Limiting nos Endpoints

**Severidade:** MÉDIO  
**Status:** OPEN  
**Componente:** `src/api/routes/`

#### Descrição
Endpoints não têm proteção contra abuse/DoS

#### Passos para Reproduzir
1. Enviar 1000 requisições POST em 1 segundo
2. Servidor aceita todas
3. Possível crash ou consumo de memória

#### Resultado Esperado
Retornar 429 Too Many Requests após limite

#### Resultado Atual
Sem limite, vulnerável a DoS

#### Recomendação
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por windowMs
});

app.use('/api/', limiter);
```

#### Impacto
- Vulnerabilidade a DoS
- Consumo não controlado de recursos
- Indisponibilidade de serviço

---

### BUG #7 - BAIXO: Console.log em Produção

**Severidade:** BAIXO  
**Status:** OPEN  
**Componente:** `server.js`, `scripts/build.js`

#### Descrição
Logs de console aparecem em produção, poluindo logs e potencialmente vazando informações

#### Exemplo em server.js:
```javascript
server.listen(PORT, HOST, () => {
  console.log(`sacidata rodando em http://${HOST}:${PORT}`); // LOG EM PRODUÇÃO
});
```

#### Resultado Esperado
Usar logger estruturado com níveis de severidade

#### Recomendação
```javascript
const logger = require('winston'); // ou outro logger

server.listen(PORT, HOST, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`sacidata rodando em http://${HOST}:${PORT}`);
  }
  logger.info('Server started', { port: PORT, host: HOST });
});
```

#### Impacto
- Poluição de logs
- Informações sensíveis podem vazar
- Dificulta debug em produção

---

## Testes Escrito - Cobertura

### Unit Tests Criados
- `tests/unit/server.config.test.js` - 15 testes de configuração
- `tests/unit/frontend.components.test.js` - 25 testes de componentes
- `tests/unit/api.service.test.js` - 4 testes de serviço API (existente)
- `tests/unit/dataController.test.js` - 7 testes de controller (existente)

**Total Unit Tests:** 51

### Integration Tests Criados
- `tests/integration/security_performance.test.js` - 30 testes
- `tests/integration/server.integration.test.js` - 25 testes (existente)
- `tests/integration/dataFlow.integration.test.js` - 20 testes (existente)

**Total Integration Tests:** 75

**Total de Testes:** 126 testes

---

## Recomendações de Ação

### Imediato (P0 - 24h)
- [ ] Aplicar validação de tipo para `value` no dataController (BUG #1)
- [ ] Revisar e reforçar proteção path traversal (BUG #2)

### Curto Prazo (P1 - 1 semana)
- [ ] Implementar autenticação de endpoints (BUG #4)
- [ ] Adicionar validação completa de inputs (BUG #3)
- [ ] Implementar rate limiting (BUG #6)
- [ ] Adicionar headers CORS (BUG #5)

### Médio Prazo (P2 - 2 semanas)
- [ ] Estruturar logging adequado (BUG #7)
- [ ] Aumentar cobertura de testes para 80%+
- [ ] Implementar integration tests em CI/CD

---

## Checklist Pré-Deploy

- [x] Unit tests executados e passando
- [x] Integration tests executados e passando
- [x] Code review realizado
- [ ] Security audit realizado
- [ ] Performance test realizado
- [ ] Bugs críticos resolvidos
- [ ] Documentação atualizada

---

## Próximos Passos para QA

1. Executar `npm test:unit` e `npm test:integration`
2. Gerar relatório de cobertura: `npm run test:coverage`
3. Validar em staging antes de produção
4. Comunicar bugs ao time de desenvolvimento
5. Rastrear resolução de cada bug

---

**Relatório Assinado:** ThinkCoffee QA Team  
**Data de Emissão:** 2024  
**Versão:** 1.0
