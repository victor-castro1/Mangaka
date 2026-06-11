import Link from "next/link"
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao MangaKá Store</h1>
        <p className={styles.subtitle}>HQs e Mangás de Marvel, DC, Bandai e Capcom</p>
        <Link href="/catalogo" className={styles.button}>Ver Catálogo</Link>
      </div>

      <div className={styles.editoras}>
        <div className={`${styles.card} ${styles.marvel}`}>Marvel</div>
        <div className={`${styles.card} ${styles.dc}`}>DC</div>
        <div className={`${styles.card} ${styles.bandai}`}>Bandai</div>
        <div className={`${styles.card} ${styles.capcom}`}>Capcom</div>
      </div>
    </main>
  )
}