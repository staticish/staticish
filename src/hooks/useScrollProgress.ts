import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Progress of a tall scroll container through the viewport, 0 → 1.
 *
 * 0 is "the container's top just reached the top of the viewport" and 1 is
 * "its bottom just reached the bottom", which is exactly the window in which
 * the sticky stage inside it is pinned.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    const read = () => {
      frame.current = 0
      const el = ref.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const travel = height - window.innerHeight
      if (travel <= 0) return setProgress(0)
      setProgress(Math.min(1, Math.max(0, -top / travel)))
    }
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [ref])

  return progress
}
