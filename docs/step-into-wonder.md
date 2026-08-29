# Step Into Wonder

A single-page immersive React + TypeScript scroll experience. Curtains open on a
glowing portal, the camera dives through it into a new world, and a curved
ferris-wheel slider of nine pastel cards turns as the scroll continues.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle into dist/
```

## How it works

The whole experience is one `480vh` scroll track (`.track`) containing a single
`position: sticky` stage. `useScrollProgress` turns the track's position into a
0 → 1 value, and `timeline.ts` maps that one value onto every layer, so all the
beats stay locked together:

| Progress | Beat |
| --- | --- |
| on load | curtains draw apart to reveal the portal, then the headline, nav and three cards fade up |
| 0.00 → 0.26 | curtains sweep offscreen |
| 0.00 → 0.62 | the camera accelerates through the portal |
| 0.14 → 0.46 | scene one lifts and fades |
| 0.26 → 0.90 | world and cloud layers settle in behind the portal |
| 0.34 → 0.56 | portal cross-fades into the world |
| 0.60 → 0.76 | “Forge Beyond the Real” arrives |
| 0.62 → 1.00 | the ferris wheel rotates through all nine cards |

`useMouseParallax` adds an eased pointer drift on top, at a different depth per
layer. It is disabled for coarse pointers and for `prefers-reduced-motion`.

The wheel carries **two** passes of the nine cards around a closed rim of
eighteen evenly spaced slots. That keeps the arc densely populated at every
point in the rotation; the two copies of a card sit 180° apart, so only ever one
is on screen.

Type is Viaoda Libre for headings and Imprima for body, loaded from Google
Fonts in `index.html`.

## Assets

⚠️ **The five main assets are stand-ins.** The brief supplied truncated URLs
(`…figma.site/_assets/v11/bb…`, `53…`, `ab…`, `4f…`, `fb…`) and that host is not
reachable from the build environment, so the real files could not be fetched.

Every image is resolved through one module, `src/assets.ts`. The locally
generated SVGs in `public/assets/` match the intended composition — portal
background, left/right curtains, world background, clouds. To use the real
artwork, replace the right-hand side of each entry in the `ASSETS` map with the
full CDN URL. Nothing else in the codebase needs to change.

```ts
export const ASSETS = {
  portal: 'https://…/_assets/v11/bb…',
  curtainLeft: 'https://…/_assets/v11/53…',
  // …
}
```

## Layout

```
src/
  App.tsx                  stage, layer stack, curtains
  timeline.ts              the single scroll → state mapping
  assets.ts                every image URL, in one place
  styles.css
  components/
    SceneOne.tsx           headline, nav, three rounded cards
    SceneTwo.tsx           “Forge Beyond the Real” + the ferris wheel
  hooks/
    useScrollProgress.ts
    useMouseParallax.ts
    useCurtainReveal.ts
```
