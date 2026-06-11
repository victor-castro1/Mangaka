import styles from "./contato.module.css"

const integrantes = [
  { nome: "Guilherme Vargas", funcao: " a pessoa é responsável pela Navbar e Layout" },
  { nome: "Lucas de Assis", funcao: " a pessoa é responsável pelo Catálogo" },
  { nome: "Victor Hugo Soares Castro", funcao: "Responsável pelas páginas Sobre e Contato" },
]

export default function Contato() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Contato</h1>
      <p className={styles.subtitle}>Somos uma equipe que desenvolveu esse projeto</p>

      <div className={styles.grid}>
        {integrantes.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.avatar}>{item.nome[0]}</div>
            <h2 className={styles.nome}>{item.nome}</h2>
            <p className={styles.funcao}>{item.funcao}</p>
          </div>
        ))}
      </div>
    </main>
  )
}