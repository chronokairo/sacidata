// Componente de lista de dados
export function DataList({ data }) {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}: {item.value}</li>
      ))}
    </ul>
  );
}