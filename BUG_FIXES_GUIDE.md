# Bug Fixes - SACIDATA

## BUG #001 & #002 - Validação Robusta

### Arquivo: `src/api/controllers/dataController.js`

**ANTES (Buggy):**
```javascript
exports.createData = (req, res) => {
  const { name, value } = req.body;
  
  if (!name || value === undefined) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  const newItem = {
    id: String(mockData.length + 1),
    name,
    value
  };

  mockData.push(newItem);
  res.status(201).json(newItem);
};
```

**DEPOIS (Fixed):**
```javascript
exports.createData = (req, res) => {
  const { name, value } = req.body;
  
  // Validação robusta
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ 
      error: 'Name é obrigatório e deve ser uma string não-vazia' 
    });
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return res.status(400).json({ 
      error: 'Value é obrigatório e deve ser um número válido' 
    });
  }

  const newItem = {
    id: String(mockData.length + 1),
    name: name.trim(),
    value
  };

  mockData.push(newItem);
  res.status(201).json(newItem);
};
```

---

## BUG #003 - UUID para IDs

### Arquivo: `src/api/controllers/dataController.js`

**Adicionar import:**
```javascript
const { v4: uuidv4 } = require('uuid');
```

**Adicionar ao package.json:**
```json
"dependencies": {
  "uuid": "^9.0.0"
}
```

**Substituir geração de ID:**
```javascript
// ANTES
id: String(mockData.length + 1),

// DEPOIS
id: uuidv4(),
```

---

## BUG #004 - Error Handler Mongoose

### Arquivo: `src/api/controllers/dataController.js`

**Adicionar middleware de erro:**
```javascript
exports.handleDatabaseError = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({ 
      error: 'Recurso com esse ID já existe' 
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Dados inválidos: ' + error.message 
    });
  }

  res.status(500).json({ 
    error: 'Erro interno do servidor' 
  });
};
```

---

## BUG #005 - Sanitização XSS

### Arquivo: `src/api/controllers/dataController.js`

**Adicionar import:**
```javascript
const xss = require('xss');
```

**Adicionar ao package.json:**
```json
"dependencies": {
  "xss": "^1.0.14"
}
```

**Sanitizar inputs:**
```javascript
exports.createData = (req, res) => {
  let { name, value } = req.body;
  
  // Sanitizar name contra XSS
  name = xss(name);
  
  // ... resto da validação
};
```

---

## Testes de Verificação

### Executar após corrigir bugs:

```bash
npm run test:unit
npm run test:integration
npm run test:coverage
```

### Teste Manual:

```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "value": "<script>"}'
# Esperado: 400 Bad Request (sanitizado)

curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "value": 0}'
# Esperado: 201 Created (value=0 é número válido)
```

---

## Checklist de Validação

- [ ] BUG #001: Aceita value=0 corretamente
- [ ] BUG #002: Rejeita value não-número
- [ ] BUG #003: IDs são UUIDs únicos
- [ ] BUG #004: Retorna 409 em duplicação
- [ ] BUG #005: Sanitiza HTML/scripts
- [ ] 100% testes passando
- [ ] Coverage acima de 85%
