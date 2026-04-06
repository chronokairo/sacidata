// Entry point
import Home from './pages/Home.js';
import { createRoot } from 'react-dom/client';
import { DataProvider } from './state/store.js';

const root = document.getElementById('root');
createRoot(root).render(
  <DataProvider>
    <Home />
  </DataProvider>
);
