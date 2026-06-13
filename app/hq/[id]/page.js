"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { buscarHQPorId } from "../../../lib/api"
import { getIconeEditora, getCorEditora } from "../../../lib/editoras"
import StarRating from "../../../components/StarRating/StarRating"
import FavoriteButton from "../../../components/FavoriteButton/FavoriteButton"
import styles from "./hq.module.css"

// Mesmo "gerador de preço" usado no HQCard, só pra manter o valor igual
// em todas as telas (já que a Google Books API não retorna preço).
function gerarPreco(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000
  }
  const preco = 30 + (hash % 50)
  return preco.toFixed(2)
}

export default function DetalhesHQ() {
  const { id } = useParams()

  const [hq, setHq] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const [capaComErro, setCapaComErro] = useState(false)

  useEffect(() => {
    async function carregarHQ() {
      setCarregando(true)
      setErro(false)

      try {
        const resultado = await buscarHQPorId(id)
        setHq(resultado)
      } catch {
        setErro(true)
      } finally {
        setCarregando(false)
      }
    }

    carregarHQ()
  }, [id])

  if (carregando) {
    return <p className={styles.status}>Carregando...</p>
  }

  if (erro || !hq) {
    return (
      <main className={styles.main}>
        <p className={styles.status}>Não foi possível carregar essa HQ.</p>
        <Link href="/catalogo" className={styles.voltar}>← Voltar para o catálogo</Link>
      </main>
    )
  }

  const preco = gerarPreco(hq.id)
  const mostrarCapa = hq.capa && !capaComErro

  return (
    <main className={styles.main}>
      <Link href="/catalogo" className={styles.voltar}>← Voltar para o catálogo</Link>

      <div className={styles.conteudo}>
        <div className={styles.capaWrapper}>
          {mostrarCapa ? (
            <img
              src={hq.capa}
              alt={hq.titulo}
              className={styles.capa}
              onError={() => setCapaComErro(true)}
            />
          ) : (
            <div
              className={styles.capaFallback}
              style={{ backgroundColor: getCorEditora(hq.editora) }}
            >
              <span className={styles.iconeFallback}>{getIconeEditora(hq.editora)}</span>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.badge} style={{ backgroundColor: getCorEditora(hq.editora) }}>
            {hq.editora}
          </span>

          <h1 className={styles.titulo}>{hq.titulo}</h1>
          <p className={styles.ano}>{hq.ano}</p>

          <StarRating nota={hq.avaliacao} />

          <p className={styles.sinopse}>{hq.sinopse}</p>

          <div className={styles.acoes}>
            <span className={styles.preco}>R$ {preco}</span>
            <FavoriteButton id={hq.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
