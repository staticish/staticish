import { SCENE_ONE_CARDS } from '../assets'
import type { Parallax } from '../hooks/useMouseParallax'
import type { Timeline } from '../timeline'

const NAV = ['Reverie', 'Chapters', 'The Makers', 'Archive']

type Props = { t: Timeline; parallax: Parallax; revealed: boolean }

export default function SceneOne({ t, parallax, revealed }: Props) {
  return (
    <div
      className="scene-one"
      style={{
        opacity: t.sceneOneOpacity,
        transform: `translate3d(${parallax.x * -14}px, ${
          parallax.y * -10 - t.sceneOneLift * 90
        }px, 0) scale(${1 + t.sceneOneLift * 0.16})`,
        visibility: t.sceneOneOpacity < 0.01 ? 'hidden' : 'visible',
      }}
      aria-hidden={t.sceneOneOpacity < 0.5}
    >
      <header className={`masthead${revealed ? ' is-in' : ''}`}>
        <span className="wordmark">Step Into Wonder</span>
        <nav aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={`scene-one__body${revealed ? ' is-in' : ''}`}>
        <h1 className="headline">
          <span className="headline__line">Fall</span>
          <span className="headline__chevron" aria-hidden="true">
            &rsaquo;
          </span>
          <span className="headline__line">Into Reverie</span>
        </h1>

        <p className="lede">
          A door left ajar between the waking world and the one beneath it. Step through, and the
          fall becomes the journey.
        </p>

        <ul className="card-row">
          {SCENE_ONE_CARDS.map((card, i) => (
            <li
              key={card.title}
              className="card"
              style={{ transitionDelay: `${0.9 + i * 0.13}s` }}
            >
              <img src={card.src} alt="" loading="eager" />
              <div className="card__meta">
                <span className="card__caption">{card.caption}</span>
                <span className="card__title">{card.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`scroll-cue${revealed ? ' is-in' : ''}`} aria-hidden="true">
        <span>Scroll to fall</span>
        <i />
      </div>
    </div>
  )
}
