"use client"

import styles from "./FilterBar.module.css"

const filtros = [
  { nome: "Todos", classe: "todos" },
  { nome: "Marvel", classe: "marvel" },
  { nome: "DC", classe: "dc" },
  { nome: "Bandai", classe: "bandai" },
  { nome: "Capcom", classe: "capcom" },
]

export default function FilterBar({ filtroAtivo, onFiltrar }) {
  return (
    <div className={styles.container}>
      {filtros.map((filtro) => (
        <button
          key={filtro.nome}
          className={`${styles.botao} ${
            filtroAtivo === filtro.nome ? styles[filtro.classe] : ""
          }`}
          onClick={() => onFiltrar(filtro.nome)}
        >
          {filtro.nome}
        </button>
      ))}
    </div>
  )
}