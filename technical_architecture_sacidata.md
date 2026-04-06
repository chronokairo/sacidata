# Arquitetura Técnica e Organização do Projeto Sacidata

## Stack Tecnológica
- **Backend**: Node.js com Express.js
- **Frontend**: React.js
- **Banco de Dados**: MongoDB
- **Testes**: Jest para testes unitários e integração
- **Containerização**: Docker

## Estrutura de Pastas
Abaixo está a estrutura de pastas proposta para o projeto:

```
/
|-- backend/
|   |-- controllers/       # Lógica de controle
|   |-- models/            # Modelos de dados
|   |-- routes/            # Definição de rotas
|   |-- services/          # Serviços e lógica de negócios
|   |-- tests/             # Testes unitários e de integração
|   |-- server.js          # Configuração do servidor
|
|-- frontend/
|   |-- components/        # Componentes React
|   |-- pages/             # Páginas React
|   |-- services/          # Comunicação com APIs
|   |-- state/             # Gerenciamento de estado
|   |-- tests/             # Testes de componentes e integração
|   |-- main.js            # Ponto de entrada do frontend
|
|-- config/                # Arquivos de configuração
|-- public/                # Arquivos estáticos
|-- scripts/               # Scripts utilitários
|-- tests/                 # Testes globais
|-- docker-compose.yml     # Configuração do Docker Compose
|-- Dockerfile             # Configuração do Docker
|-- package.json           # Dependências do projeto
|-- README.md              # Documentação principal
```

## Padrões de Organização
1. **Modularidade**: Cada módulo (ex.: backend, frontend) deve ser autossuficiente e conter suas próprias dependências e testes.
2. **Nomenclatura**: Usar nomes descritivos e consistentes para arquivos e pastas.
3. **Testes**: Manter testes próximos ao código que testam, mas também ter uma pasta global para testes integrados.
4. **Configuração**: Centralizar configurações em uma pasta `config/`.

## Próximos Passos
1. Reorganizar os arquivos existentes para seguir a estrutura proposta.
2. Atualizar os scripts de build e execução para refletir a nova organização.
3. Garantir que todos os testes estejam funcionando após a reorganização.

---

Este documento deve ser usado como referência para a reorganização do projeto Sacidata.