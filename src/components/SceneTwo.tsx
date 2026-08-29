import { clamp01, ease, mix } from '../timeline'
import type { Parallax } from '../hooks/useMouseParallax'
import type { Timeline } from '../timeline'

/** Nine pastel panels ride the wheel. */
const WHEEL_CARDS = [
  { title: 'Gossamer', tint: '#e7d3f2' },
  { title: 'Saltglass', tint: '#cfe4ef' },
  { title: 'Duneheart', tint: '#f4e0c8' },
  { title: 'Verdigris', tint: '#d3ead8' },
  { title: 'Nocturne', tint: '#d2d3ef' },
  { title: 'Rosewake', tint: '#f5d5da' },
  { title: 'Amberlight', tint: '#f7e6c2' },
  { title: 'Tidemark', tint: '#c9e3e6' },
  { title: 'Lastlight', tint: '#e9d6e6' },
] as const

/**
 * The rim carries two passes of the nine cards — eighteen evenly spaced slots.
 * That keeps the arc densely populated at every point in the rotation, and the
 * two copies of a card sit 180 degrees apart, so only ever one is on screen.
 */
const SLOTS = WHEEL_CARDS.length * 2
const STEP = 360 / SLOTS
/** Total sweep, so the first card starts centred and the last ends centred. */
const SWEEP = STEP * (WHEEL_CARDS.length - 1)
/** How far from the top of the arc a card stays visible. */
const FALLOFF = 64
/** Cards lean with the rim, but only partly — a full lean is unreadable. */
const LEAN = 0.62

/** Shortest signed distance from the top of the arc, in degrees. */
const fromTop = (deg: number) => {
  const wrapped = ((deg % 360) + 540) % 360 - 180
  return wrapped
}

type Props = { t: Timeline; parallax: Parallax }

export default function SceneTwo({ t, parallax }: Props) {
  const rotation = -t.wheel * SWEEP

  return (
    <div
      className="scene-two"
      style={{
        opacity: t.sceneTwo,
        visibility: t.sceneTwo < 0.01 ? 'hidden' : 'visible',
        transform: `translate3d(${parallax.x * -10}px, ${
          parallax.y * -8 + mix(70, 0, t.sceneTwo)
        }px, 0)`,
      }}
      aria-hidden={t.sceneTwo < 0.5}
    >
      <div className="scene-two__copy">
        <h2 className="headline headline--two">Forge Beyond the Real</h2>
        <p className="lede lede--two">
          Nine worlds turn on the same axle. Keep falling and they come round to meet you, one
          pastel face at a time.
        </p>
      </div>

      <div className="wheel-stage" aria-hidden="true">
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {Array.from({ length: SLOTS }, (_, i) => {
            const card = WHEEL_CARDS[i % WHEEL_CARDS.length]
            // How far this card sits from the top of the arc, in degrees.
            const offset = fromTop(i * STEP + rotation)
            const away = clamp01(Math.abs(offset) / FALLOFF)
            return (
              <div
                key={i}
                className="wheel-card"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * STEP}deg) translateY(calc(var(--wheel-r) * -1))`,
                  opacity: mix(1, 0.12, ease(away)),
                  ['--tint' as string]: card.tint,
                }}
              >
                <div
                  className="wheel-card__inner"
                  style={{
                    transform: `rotate(${-offset * (1 - LEAN)}deg) scale(${mix(1, 0.8, ease(away))})`,
                  }}
                >
                  <span className="wheel-card__index">
                    {String((i % WHEEL_CARDS.length) + 1).padStart(2, '0')}
                  </span>
                  <span className="wheel-card__title">{card.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
