export async function fetchData() {
    const response = await fetch('/api/data');
    if (!response.ok) {
        throw new Error('Erro ao buscar dados');
    }
    return await response.json();
};