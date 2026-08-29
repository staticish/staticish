import { useRef } from 'react'
import { ASSETS } from './assets'
import SceneOne from './components/SceneOne'
import SceneTwo from './components/SceneTwo'
import { useCurtainReveal } from './hooks/useCurtainReveal'
import { useMouseParallax } from './hooks/useMouseParallax'
import { useScrollProgress } from './hooks/useScrollProgress'
import { SCENE_HEIGHT_VH, timeline } from './timeline'

export default function App() {
  const track = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(track)
  const parallax = useMouseParallax()
  const revealed = useCurtainReveal()
  const t = timeline(progress)

  // Curtains start shut, draw apart on load, then the scroll carries them off.
  const drawn = revealed ? 1 : 0
  const curtainShift = -(81 * drawn + 45 * t.curtains)

  return (
    <main ref={track} className="track" style={{ height: `${SCENE_HEIGHT_VH}vh` }}>
      <div className="stage">
        {/* --- world, furthest back --- */}
        <div
          className="layer layer--world"
          style={{
            opacity: t.worldOpacity,
            transform: `translate3d(${parallax.x * -18}px, ${parallax.y * -12}px, 0) scale(${t.worldScale})`,
          }}
        >
          <img src={ASSETS.world} alt="" />
        </div>

        {/* --- clouds drifting in front of the world --- */}
        <div
          className="layer layer--clouds"
          style={{
            opacity: t.cloudOpacity,
            transform: `translate3d(${parallax.x * -34}px, ${parallax.y * -22}px, 0) scale(${t.cloudScale})`,
          }}
        >
          <img src={ASSETS.clouds} alt="" />
        </div>

        {/* --- the portal the camera dives through --- */}
        <div
          className="layer layer--portal"
          style={{
            opacity: t.portalOpacity,
            transform: `translate3d(${parallax.x * -24}px, ${parallax.y * -16}px, 0) scale(${t.portalScale})`,
          }}
        >
          <img src={ASSETS.portal} alt="" />
        </div>

        <div className="vignette" aria-hidden="true" />

        <SceneOne t={t} parallax={parallax} revealed={revealed} />
        <SceneTwo t={t} parallax={parallax} />

        {/* --- curtains sit above everything --- */}
        <div
          className="curtain curtain--left"
          style={{
            transform: `translate3d(calc(${curtainShift}% + ${parallax.x * -8}px), 0, 0)`,
          }}
          aria-hidden="true"
        >
          <img src={ASSETS.curtainLeft} alt="" />
        </div>
        <div
          className="curtain curtain--right"
          style={{
            transform: `translate3d(calc(${-curtainShift}% + ${parallax.x * -8}px), 0, 0)`,
          }}
          aria-hidden="true"
        >
          <img src={ASSETS.curtainRight} alt="" />
        </div>
      </div>
    </main>
  )
}
