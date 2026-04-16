// Minimal markdown renderer — handles *em*, **strong**, # headings, paragraphs
// No external deps needed for this level of content.

export function renderMarkdown(md: string): string {
  if (!md) return ''

  const lines = md.split('\n')
  const html: string[] = []
  let inParagraph = false

  const closeParagraph = () => {
    if (inParagraph) {
      html.push('</p>')
      inParagraph = false
    }
  }

  const inline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      closeParagraph()
      continue
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      closeParagraph()
      const level = headingMatch[1].length
      html.push(`<h${level}>${inline(headingMatch[2])}</h${level}>`)
      continue
    }

    if (!inParagraph) {
      html.push('<p>')
      inParagraph = true
    } else {
      html.push(' ')
    }
    html.push(inline(trimmed))
  }

  closeParagraph()
  return html.join('')
}
