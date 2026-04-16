interface Props {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: '80px',
  md: '160px',
  lg: '100%',
}

export function AlbumCover({ src, alt, size = 'md', className }: Props) {
  const dim = sizes[size]

  if (!src) {
    return (
      <div
        style={`width:${size === 'lg' ? '100%' : dim};aspect-ratio:1;background:#1a1a1a;border:1px solid #2a2820;display:flex;align-items:center;justify-content:center;${className ?? ''}`}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#3a3830" stroke-width="1.5"/>
          <circle cx="16" cy="16" r="4" fill="#3a3830"/>
          <line x1="16" y1="4" x2="16" y2="8" stroke="#3a3830" stroke-width="1.5"/>
          <line x1="16" y1="24" x2="16" y2="28" stroke="#3a3830" stroke-width="1.5"/>
          <line x1="4" y1="16" x2="8" y2="16" stroke="#3a3830" stroke-width="1.5"/>
          <line x1="24" y1="16" x2="28" y2="16" stroke="#3a3830" stroke-width="1.5"/>
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={`width:${size === 'lg' ? '100%' : dim};aspect-ratio:1;object-fit:cover;display:block;${className ?? ''}`}
    />
  )
}
