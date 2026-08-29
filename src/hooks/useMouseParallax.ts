import { useEffect, useRef, useState } from 'react'

export type Parallax = { x: number; y: number }

/**
 * Pointer offset from the centre of the viewport, normalised to -1 → 1 and
 * eased so the layers drift rather than snap. Disabled for coarse pointers and
 * for visitors who prefer reduced motion.
 */
export function useMouseParallax(easing = 0.075): Parallax {
  const [offset, setOffset] = useState<Parallax>({ x: 0, y: 0 })
  const target = useRef<Parallax>({ x: 0, y: 0 })
  const current = useRef<Parallax>({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return

    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    let raf = requestAnimationFrame(function step() {
      const { x, y } = current.current
      const next = {
        x: x + (target.current.x - x) * easing,
        y: y + (target.current.y - y) * easing,
      }
      current.current = next
      // Only re-render once the drift is visible, to keep the scroll path cheap.
      if (Math.abs(next.x - x) > 0.0004 || Math.abs(next.y - y) > 0.0004) setOffset(next)
      raf = requestAnimationFrame(step)
    })

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [easing])

  return offset
}
