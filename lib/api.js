const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export async function buscarHQsPorEditora(editora) {
  
/* api.js tentava ler process.env.GOOGLE_BOOKS_API_KEY antes do dotenv ter carregado o .env.local, por isso a chave vinha undefined e a API retornava erro de quota (sem chave).

Movendo const API_KEY = process.env.GOOGLE_BOOKS_API_KEY para dentro de cada função,
ela só é lida quando a função é chamada, e nesse momento o dotenv já rodou e a variável já existe. 

Por isso que quando colocava o const API_KEY = process.env.GOOGLE_BOOKS_API_KEY fora de cada função, o dontenv ainda não carregou, por isso que gerava o erro,
assim não retornando nenhuma lista */

  const API_KEY = process.env.GOOGLE_BOOKS_API_KEY 
  const res = await fetch(`${BASE_URL}?q=${editora}&maxResults=20&key=${API_KEY}`)
  const data = await res.json()

  if (!data.items) return []

  return data.items.map((item) => {
    const info = item.volumeInfo
    return {
      id: item.id,
      titulo: info.title,
      editora: info.publisher || "Desconhecida",
      capa: info.imageLinks?.thumbnail || "",
      sinopse: info.description || "Sem descrição disponível.",
      avaliacao: info.averageRating || 0,
      ano: info.publishedDate || "Sem data",
    }
  })
}

export async function buscarHQPorId(id) {
  const API_KEY = process.env.GOOGLE_BOOKS_API_KEY
  const res = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`)
  const data = await res.json()
  const info = data.volumeInfo

  return {
    id: data.id,
    titulo: info.title,
    editora: info.publisher || "Desconhecida",
    capa: info.imageLinks?.thumbnail || "",
    sinopse: info.description || "Sem descrição disponível.",
    avaliacao: info.averageRating || 0,
    ano: info.publishedDate || "Sem data",
  }
}