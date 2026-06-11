"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span className={styles.logoText}>MangaKá Store</span>
      </div>

      <ul className={styles.links}>
        <li><Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link></li>
        <li><Link href="/catalogo" className={pathname === "/catalogo" ? styles.active : ""}>Catálogo</Link></li>
        <li><Link href="/favoritos" className={pathname === "/favoritos" ? styles.active : ""}>Favoritos</Link></li>
        <li><Link href="/sobre" className={pathname === "/sobre" ? styles.active : ""}>Sobre</Link></li>
        <li><Link href="/contato" className={pathname === "/contato" ? styles.active : ""}>Contato</Link></li>
      </ul>

      <div className={styles.heart}>♡</div>
    </nav>
  )
}