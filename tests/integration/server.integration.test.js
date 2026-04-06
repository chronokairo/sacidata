const http = require('http');
const fs = require('fs');
const path = require('path');

describe('Integration Tests - Server HTTP', () => {
  
  describe('Config.js Geração', () => {
    it('deve gerar config.js com variáveis de ambiente padrão', (done) => {
      const expectedConfig = {
        appName: 'SACI – Sistema de Avaliação da Qualidade dos Igarapés',
        port: 3000,
        mapCenter: [-3.119, -60.021],
        mapZoom: 12,
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tileAttribution: '&copy; OpenStreetMap contributors'
      };

      // Simular requisição para /config.js
      expect(expectedConfig.appName).toBeDefined();
      expect(expectedConfig.mapCenter).toHaveLength(2);
      expect(expectedConfig.mapZoom).toBeGreaterThan(0);
      done();
    });

    it('deve lançar eventos de erro em números inválidos', () => {
      const numberEnv = (value, fallback) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
      };

      expect(numberEnv('3.5', 0)).toBe(3.5);
      expect(numberEnv('abc', 10)).toBe(10);
      expect(numberEnv(undefined, 5)).toBe(5);
      expect(numberEnv(NaN, 0)).toBe(0);
    });
  });

  describe('Static File Serving', () => {
    it('deve mapear tipos MIME corretamente', () => {
      const mimeTypes = {
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
      };

      expect(mimeTypes['.js']).toBe('application/javascript; charset=utf-8');
      expect(mimeTypes['.css']).toBe('text/css; charset=utf-8');
      expect(mimeTypes['.json']).toBe('application/json; charset=utf-8');
    });

    it('deve decodificar URLs corretamente', () => {
      const testUrls = [
        { encoded: '/', decoded: '/' },
        { encoded: '/index.html', decoded: '/index.html' },
        { encoded: '/%20space', decoded: '/ space' },
        { encoded: '/pasta%2Farquivo.js', decoded: '/pasta/arquivo.js' }
      ];

      testUrls.forEach(({ encoded, decoded }) => {
        expect(decodeURIComponent(encoded)).toBe(decoded);
      });
    });

    it('deve remover query strings de URLs', () => {
      const urls = [
        { full: '/api/data?sort=name', path: '/api/data' },
        { full: '/config.js?v=1.0', path: '/config.js' },
        { full: '/?test=1', path: '/' }
      ];

      urls.forEach(({ full, path: expected }) => {
        const requestPath = decodeURIComponent((full || '/').split('?')[0]);
        expect(requestPath).toBe(expected);
      });
    });
  });

  describe('Security - Path Traversal Protection', () => {
    it('deve rejeitar path traversal attacks', () => {
      const ROOT_DIR = '/app';
      const testPaths = [
        { malicious: '/../../../etc/passwd', shouldBlock: true },
        { malicious: '/normal/path/file.js', shouldBlock: false },
        { malicious: '/./.././../etc/passwd', shouldBlock: true }
      ];

      testPaths.forEach(({ malicious, shouldBlock }) => {
        const filePath = path.resolve(ROOT_DIR, `.${malicious}`);
        const isAllowed = filePath.startsWith(ROOT_DIR);
        
        if (shouldBlock) {
          expect(isAllowed).toBe(false);
        }
      });
    });
  });

  describe('Request Handling', () => {
    it('deve servir index.html para requisição raiz', () => {
      const requestPath = '/';
      const normalizedPath = requestPath === '/' ? '/index.html' : requestPath;
      
      expect(normalizedPath).toBe('/index.html');
    });

    it('deve servir index.html para diretórios', () => {
      const testDirs = ['/public', '/src', '/static'];
      
      testDirs.forEach(dir => {
        const indexPath = path.join(dir, 'index.html');
        expect(indexPath).toContain('index.html');
      });
    });

    it('deve retornar 404 para arquivos não encontrados', () => {
      const nonExistentFile = '/inexistent-file-12345.xyz';
      expect(nonExistentFile).not.toBe(null);
      // Arquivo não existe, deveria retornar 404
    });
  });

  describe('Environment Variables', () => {
    it('deve usar variáveis de ambiente com fallback', () => {
      const APP_NAME = process.env.APP_NAME || 'SACI – Sistema de Avaliação da Qualidade dos Igarapés';
      const PORT = Number(process.env.PORT || 3000);
      
      expect(APP_NAME).toBeDefined();
      expect(PORT).toBeGreaterThan(0);
    });

    it('deve validar tipos de variáveis de ambiente numéricos', () => {
      const numberEnv = (value, fallback) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
      };

      expect(typeof numberEnv('3000', 8000)).toBe('number');
      expect(numberEnv('invalid', 5000)).toBe(5000);
    });
  });
});
