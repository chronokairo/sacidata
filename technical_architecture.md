# Arquitetura Técnica - Sacidata

## 1. Stack Tecnológico
- **Frontend:** HTML5, CSS3, JavaScript.
- **Runtime:** Node.js 20.
- **Empacotamento/Execução:** Docker e npm scripts.
- **CI/CD:** GitHub Actions.
- **Configuração:** Variáveis de ambiente via `.env`.

## 2. Estrutura de Entrega
- `index.html`, `style.css`, `script.js`: interface principal.
- `config.js`: configuração de runtime consumida no navegador.
- `server.js`: servidor HTTP para execução local e container.
- `scripts/build.js`: gera artefato em `dist/`.
- `scripts/deploy.js`: prepara deploy local ou por artefato.
- `.github/workflows/ci-cd.yml`: pipeline de validação e build.

## 3. Estratégia de Deploy
### Ambiente local
Executar via `npm start` ou `docker compose up --build`.

### Ambiente de build
Executar `npm run validate` e `npm run build`.

### Publicação
Publicar o conteúdo de `dist/` no provedor escolhido ou copiar para `DEPLOY_TARGET_DIR`.

## 4. Variáveis de ambiente
- `PORT`
- `APP_NAME`
- `MAP_CENTER_LAT`
- `MAP_CENTER_LNG`
- `MAP_ZOOM`
- `TILE_URL`
- `TILE_ATTRIBUTION`
- `DEPLOY_TARGET_DIR` opcional para o deploy local

## 5. Observações
A solução foi mantida simples para o objetivo de start project, com foco em execução previsível, containerização e pipeline básico.
