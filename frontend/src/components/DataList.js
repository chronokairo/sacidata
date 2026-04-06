// src/components/DataList.js
export function DataList({ data }) {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}: {item.value}</li>
      ))}
    </ul>
  );
}
