"use client"

import { useEffect, useState } from "react"
import { isFavorito, toggleFavorito } from "../../lib/favoritos"
import styles from "./FavoriteButton.module.css"

// Botão de favoritar "burro" o suficiente pra funcionar em qualquer página:
// ele mesmo cuida de ler/gravar o localStorage. Se o componente pai precisar
// saber quando o favorito muda (ex: a página de Favoritos pra remover o card
// da tela), basta passar a prop onChange.
export default function FavoriteButton({ id, onChange }) {
  const [favorito, setFavorito] = useState(false)

  // Só lemos o localStorage depois que o componente montou no navegador,
  // pra não dar erro de "window is not defined" no server-side.
  useEffect(() => {
    setFavorito(isFavorito(id))
  }, [id])

  function handleClick(e) {
    e.preventDefault()
    const novosFavoritos = toggleFavorito(id)
    const novoEstado = novosFavoritos.includes(id)

    setFavorito(novoEstado)
    onChange?.(novoEstado)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.botao} ${favorito ? styles.ativo : ""}`}
      aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <span className={styles.coracao}>{favorito ? "❤️" : "♡"}</span>
      <span className={styles.texto}>{favorito ? "Salvo" : "Salvar"}</span>
    </button>
  )
}
