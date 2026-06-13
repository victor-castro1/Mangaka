"use client"

import { useState } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
  const [texto, setTexto] = useState("")

  function handleChange(e) {
    const valor = e.target.value
    setTexto(valor)
    onSearch(valor)
  }

  return (
    <div className={styles.container}>
      <span className={styles.icone}>🔍</span>
      <input
        type="text"
        value={texto}
        onChange={handleChange}
        placeholder="Buscar HQ, personagem ou editora..."
        className={styles.input}
      />
    </div>
  )
}