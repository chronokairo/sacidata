// Testes para garantir que todos os arquivos .md foram movidos para a pasta docs
const fs = require('fs');
const path = require('path');

describe('Testes de Movimentação de Arquivos .md', () => {
  const docsPath = path.join(__dirname, '../docs');
  const rootPath = path.join(__dirname, '../..');

  it('deve garantir que todos os arquivos .md estão na pasta docs', () => {
    const filesInDocs = fs.readdirSync(docsPath);
    const allMdFiles = fs.readdirSync(rootPath).filter(file => file.endsWith('.md'));

    // Verifica se todos os arquivos .md estão na pasta docs
    allMdFiles.forEach(file => {
      expect(filesInDocs).toContain(file);
    });
  });

  it('não deve haver arquivos .md fora da pasta docs', () => {
    const allFiles = fs.readdirSync(rootPath);
    const mdFilesOutsideDocs = allFiles.filter(file => file.endsWith('.md') && file !== 'docs');

    // Verifica se não há arquivos .md fora da pasta docs
    expect(mdFilesOutsideDocs.length).toBe(0);
  });
});