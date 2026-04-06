# sacidata

Aplicação web para visualização e monitoramento de igarapés urbanos.

## Infraestrutura

- CI/CD com GitHub Actions em `.github/workflows/ci-cd.yml`
- Containerização com `Dockerfile` e `docker-compose.yml`
- Variáveis de ambiente em `.env` com exemplo em `.env.example`
- Deploy local via `npm run deploy`

## Variáveis de ambiente

Copie o arquivo de exemplo e ajuste os valores:

```bash
cp .env.example .env
```

Variáveis suportadas:

- `PORT`
- `HOST`
- `NODE_ENV`
- `APP_NAME`
- `MAP_CENTER_LAT`
- `MAP_CENTER_LNG`
- `MAP_ZOOM`
- `TILE_URL`
- `TILE_ATTRIBUTION`
- `DEPLOY_TARGET_DIR`

## Execução local

```bash
npm install
npm start
```

## Validação

```bash
npm run validate
npm test
npm run build
```

## Deploy local

```bash
npm run deploy
```

Se `DEPLOY_TARGET_DIR` estiver definido, o conteúdo de `dist/` será copiado para esse diretório.

## Docker

### Build

```bash
docker build -t sacidata .
```

### Execução

```bash
docker run --rm -p 3000:3000 --env-file .env sacidata
```

### Docker Compose

```bash
docker compose up --build
```

## Pipeline

O workflow executa:

1. Instalação das dependências
2. Validação do código
3. Testes automatizados
4. Build do artefato em `dist/`
5. Build da imagem Docker
6. Upload do artefato de build
