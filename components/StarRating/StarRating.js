import styles from "./StarRating.module.css"

// Recebe uma nota de 0 a 5 (a Google Books API manda esse "averageRating")
// e desenha as estrelinhas. Arredondamos pra baixo pra não ter que lidar
// com "meia estrela" desenhada.
export default function StarRating({ nota = 0 }) {
  const notaArredondada = Math.round(nota)
  const estrelas = [1, 2, 3, 4, 5]

  return (
    <div className={styles.container}>
      {estrelas.map((posicao) => (
        <span
          key={posicao}
          className={posicao <= notaArredondada ? styles.preenchida : styles.vazia}
        >
          ★
        </span>
      ))}
      <span className={styles.numero}>{nota.toFixed(1)}</span>
    </div>
  )
}
