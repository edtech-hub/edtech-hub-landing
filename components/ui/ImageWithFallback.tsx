"use client"

import { useState } from "react"

interface Props {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
}

export function ImageWithFallback({ src, alt, style, className }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        style={{ ...style, background: "rgba(16,185,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}
        className={className}
      >
        <span style={{ color: "rgba(16,185,129,0.4)", fontSize: 13 }}>{alt}</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} style={style} className={className} onError={() => setErrored(true)} />
  )
}
