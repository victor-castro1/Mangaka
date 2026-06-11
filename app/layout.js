import "./globals.css"
import Navbar from "../components/Navbar/Navbar"

export const metadata = {
  title: "MangaKá Store",
  description: "Catálogo de HQs e Mangás",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}