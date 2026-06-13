"use client"

import Link from "next/link"
import styles from "./HQCard.module.css"

function gerarPreco(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000
  }
  const preco = 30 + (hash % 50)
  return preco.toFixed(2)
}

export default function HQCard({ id, titulo, editora, capa, avaliacao, isFavorito, onFavoritar }) {
  const preco = gerarPreco(id)

  const badgeClass = {
    Marvel: styles.marvel,
    DC: styles.dc,
    Bandai: styles.bandai,
    Capcom: styles.capcom,
  }

  return (
    <div className={styles.card}>
      <Link href={`/hq/${id}`} className={styles.link}>
        <div className={styles.capaWrapper}>
          <img src={capa} alt={titulo} className={styles.capa} />
          <span className={`${styles.badge} ${badgeClass[editora] || ""}`}>
            {editora}
          </span>
        </div>

        <div className={styles.info}>
          <h3 className={styles.titulo}>{titulo}</h3>
          <p className={styles.avaliacao}>⭐ {avaliacao.toFixed(1)}</p>
          <p className={styles.preco}>R$ {preco}</p>
        </div>
      </Link>

      <button
        className={styles.favoritoBtn}
        onClick={(e) => {
          e.preventDefault()
          onFavoritar(id)
        }}
      >
        {isFavorito ? "❤️" : "♡"}
      </button>
    </div>
  )
}