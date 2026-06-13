"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import FilterBar from "../../components/FilterBar/FilterBar"
import HQCard from "../../components/HQCard/HQCard"
import { buscarHQsPorEditora } from "../../lib/api"
import styles from "./catalogo.module.css"

export default function Catalogo() {
    const [hqs, setHqs] = useState([])
    const [termoBusca, setTermoBusca] = useState("")
    const [filtroAtivo, setFiltroAtivo] = useState("Todos")
    const [favoritos, setFavoritos] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function carregarHQs() {
            setCarregando(true)

            const editora = filtroAtivo === "Todos" ? "comics" : filtroAtivo

            const resultado = await buscarHQsPorEditora(editora)
            setHqs(resultado)
            setCarregando(false)
        }

        carregarHQs()
    }, [filtroAtivo])

    function handleFavoritar(id) {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const hqsFiltradas = hqs.filter((hq) =>
        hq.titulo.toLowerCase().includes(termoBusca.toLowerCase())
    )

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catálogo de HQs</h1>

            <div className={styles.controles}>
                <SearchBar onSearch={setTermoBusca} />
                <FilterBar filtroAtivo={filtroAtivo} onFiltrar={setFiltroAtivo} />
            </div>

            {carregando ? (
                <p className={styles.status}>Carregando...</p>
            ) : (
                <>
                    <p className={styles.contador}>
                        {hqsFiltradas.length} HQs encontradas
                    </p>

                    {hqsFiltradas.length === 0 ? (
                        <p className={styles.status}>Nenhuma HQ encontrada</p>
                    ) : (
                        <div className={styles.grid}>
                            {hqsFiltradas.map((hq) => (
                                <HQCard
                                    key={hq.id}
                                    {...hq}
                                    isFavorito={favoritos.includes(hq.id)}
                                    onFavoritar={handleFavoritar}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    )
}