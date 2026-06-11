import styles from "./sobre.module.css"

export default function Sobre() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Sobre o MangaKá Store</h1>
            <p className={styles.descricao}>
                O Mangaká é um acervo de livros de temas em HQs.
                Informações abaixo estão para qual projeto foi desenvolvido
            </p>

            <div className={styles.info}>
                <div className={styles.item}>
                    <span className={styles.label}>Disciplina</span>
                    <span>Web I com REACT</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Baião</span>
                    <span>Baião</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Engenharia de Software para 5 período</span>
                    <span>Engenharia de Software</span>
                </div>
            </div>
        </main>
    )
}