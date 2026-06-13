// A Google Books API nem sempre devolve uma capa (imageLinks.thumbnail vazio).
// Nesses casos a gente cai num "placeholder" temático por editora, parecido
// com o que tinha no mockup (escudo, raio, espada, etc).

export const iconePorEditora = {
  Marvel: "🛡️",
  DC: "⚡",
  Bandai: "⚔️",
  Capcom: "🔥",
}

export const corPorEditora = {
  Marvel: "var(--color-marvel)",
  DC: "var(--color-dc)",
  Bandai: "var(--color-bandai)",
  Capcom: "var(--color-capcom)",
}

export function getIconeEditora(editora) {
  return iconePorEditora[editora] || "📕"
}

export function getCorEditora(editora) {
  return corPorEditora[editora] || "#555555"
}
