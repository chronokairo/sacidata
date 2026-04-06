import { DataList } from '../../../src/components/DataList.js';

describe('DataList Component - Unit Tests', () => {
  
  describe('Rendering', () => {
    it('deve renderizar uma lista com dados válidos', () => {
      const mockData = [
        { id: '1', name: 'Item 1', value: 100 },
        { id: '2', name: 'Item 2', value: 200 }
      ];

      // Simulando renderização React
      const component = DataList({ data: mockData });
      
      expect(component.props.children.length).toBe(2);
    });

    it('deve renderizar lista vazia quando data é vazio', () => {
      const component = DataList({ data: [] });
      
      expect(component.props.children.length).toBe(0);
    });

    it('deve usar id como key para cada item', () => {
      const mockData = [
        { id: '1', name: 'Item 1', value: 100 },
        { id: '2', name: 'Item 2', value: 200 }
      ];

      const component = DataList({ data: mockData });
      const items = component.props.children;

      items.forEach((item, index) => {
        expect(item.key).toBe(mockData[index].id);
      });
    });

    it('deve exibir nome e valor para cada item', () => {
      const mockData = [
        { id: '1', name: 'Item 1', value: 100 }
      ];

      const component = DataList({ data: mockData });
      const itemText = component.props.children[0].props.children;

      expect(itemText).toContain('Item 1');
      expect(itemText).toContain('100');
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com dados com name contendo caracteres especiais', () => {
      const mockData = [
        { id: '1', name: 'Item & Special <>', value: 100 }
      ];

      const component = DataList({ data: mockData });
      
      expect(component).toBeDefined();
    });

    it('deve lidar com valores negativos', () => {
      const mockData = [
        { id: '1', name: 'Item', value: -50 }
      ];

      const component = DataList({ data: mockData });
      const itemText = component.props.children[0].props.children;

      expect(itemText).toContain('-50');
    });
  });
});
