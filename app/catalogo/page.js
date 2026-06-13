"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import FilterBar from "../../components/FilterBar/FilterBar"
import HQCard from "../../components/HQCard/HQCard"
import { buscarHQsPorEditora } from "../../lib/api"
import { getFavoritos, toggleFavorito } from "../../lib/favoritos"
import styles from "./catalogo.module.css"

export default function Catalogo() {
    const [hqs, setHqs] = useState([])
    const [termoBusca, setTermoBusca] = useState("")
    const [filtroAtivo, setFiltroAtivo] = useState("Todos")
    const [favoritos, setFavoritos] = useState([])
    const [carregando, setCarregando] = useState(true)

    // Carrega os favoritos salvos no navegador (sincroniza com a página /favoritos)
    useEffect(() => {
        setFavoritos(getFavoritos())
    }, [])

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
        const novosFavoritos = toggleFavorito(id)
        setFavoritos(novosFavoritos)
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