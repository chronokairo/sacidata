// src/pages/Home.js
import { useEffect, useState } from 'react';
import { DataList } from '../components/DataList.js';
import { fetchData } from '../services/api.js';
import { useData } from '../state/store.js';

export default function Home() {
  const { data, setData } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, [setData]);

  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <h1>Sacidata</h1>
      <DataList data={data} />
    </div>
  );
}
