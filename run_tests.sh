#!/bin/bash
# Script para executar testes SACIDATA

echo "================================"
echo "SACIDATA - Execução de Testes"
echo "================================"
echo ""

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale Node.js e npm."
    exit 1
fi

echo "📦 Instalando dependências..."
npm install --legacy-peer-deps

echo ""
echo "🧪 Executando Testes Unitários..."
echo "================================"
npm run test:unit

echo ""
echo "🔗 Executando Testes de Integração..."
echo "======================================="
npm run test:integration

echo ""
echo "📊 Gerando Relatório de Cobertura..."
echo "====================================="
npm run test:coverage

echo ""
echo "✅ Testes Completos!"
echo ""
echo "📄 Relatórios:"
echo "  - Testes Unitários: tests/unit/"
echo "  - Testes Integração: tests/integration/"
echo "  - Cobertura HTML: coverage/index.html"
echo "  - Bugs Identificados: QA_TEST_REPORT.md"
echo ""
