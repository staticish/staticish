import { useEffect, useState } from 'react'

/**
 * The opening beat: curtains sit closed on load, hold for a moment, then draw
 * apart on their own before the visitor has scrolled anywhere.
 */
export function useCurtainReveal(delay = 550): boolean {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), delay)
    return () => window.clearTimeout(t)
  }, [delay])
  return open
}
