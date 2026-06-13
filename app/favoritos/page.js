"use client"

import { useEffect, useState } from "react"
import HQCard from "../../components/HQCard/HQCard"
import { buscarHQPorId } from "../../lib/api"
import { getFavoritos, toggleFavorito } from "../../lib/favoritos"
import styles from "./favoritos.module.css"

export default function Favoritos() {
  const [hqs, setHqs] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarFavoritos() {
      setCarregando(true)

      const ids = getFavoritos()

      // Busca cada HQ favoritada na Google Books API. Se alguma tiver sido
      // removida/renomeada lá e a Promise falhar, simplesmente ignoramos ela
      // em vez de derrubar a página inteira.
      const resultados = await Promise.all(
        ids.map((id) =>
          buscarHQPorId(id).catch(() => null)
        )
      )

      setHqs(resultados.filter(Boolean))
      setCarregando(false)
    }

    carregarFavoritos()
  }, [])

  function handleRemoverFavorito(id) {
    toggleFavorito(id)
    setHqs((prev) => prev.filter((hq) => hq.id !== id))
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Meus Favoritos</h1>

      {carregando ? (
        <p className={styles.status}>Carregando...</p>
      ) : hqs.length === 0 ? (
        <p className={styles.status}>
          Você ainda não favoritou nenhuma HQ. Vá até o{" "}
          <a href="/catalogo" className={styles.link}>catálogo</a> e clique no
          coraçãozinho das HQs que você gostar.
        </p>
      ) : (
        <div className={styles.grid}>
          {hqs.map((hq) => (
            <HQCard
              key={hq.id}
              {...hq}
              isFavorito={true}
              onFavoritar={handleRemoverFavorito}
            />
          ))}
        </div>
      )}
    </main>
  )
}
