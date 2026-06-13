// Como o catálogo, a página de detalhes e a página de favoritos são páginas
// diferentes (sem um estado global tipo Context), salvamos a lista de IDs
// favoritados no localStorage do navegador. Assim qualquer página consegue
// ler/atualizar a mesma lista.

const STORAGE_KEY = "mangaka_favoritos"

export function getFavoritos() {
  if (typeof window === "undefined") return []

  const salvos = localStorage.getItem(STORAGE_KEY)
  return salvos ? JSON.parse(salvos) : []
}

export function isFavorito(id) {
  return getFavoritos().includes(id)
}

export function toggleFavorito(id) {
  const favoritos = getFavoritos()

  const novosFavoritos = favoritos.includes(id)
    ? favoritos.filter((favoritoId) => favoritoId !== id)
    : [...favoritos, id]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(novosFavoritos))
  return novosFavoritos
}
