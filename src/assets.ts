/**
 * Single source of truth for every image the experience uses.
 *
 * The original composition sources these from the Figma Sites CDN. The URLs
 * supplied with the brief were truncated (e.g. `/_assets/v11/bb…`) and that
 * host is unreachable from this environment, so each entry falls back to a
 * locally generated stand-in that matches the intended composition.
 *
 * To use the real artwork, replace the right-hand side of each entry with the
 * full CDN URL. Nothing else in the codebase needs to change.
 */

const FIGMA_CDN = 'https://flick-award-65707097.figma.site/_assets/v11'

/** Truncated originals from the brief, kept for reference when completing them. */
export const ORIGINAL_ASSET_PREFIXES = {
  portal: `${FIGMA_CDN}/bb…`,
  curtainLeft: `${FIGMA_CDN}/53…`,
  curtainRight: `${FIGMA_CDN}/ab…`,
  world: `${FIGMA_CDN}/4f…`,
  clouds: `${FIGMA_CDN}/fb…`,
} as const

/** Assets live in `public/assets`, so they resolve against the deployed base path. */
const local = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`

export const ASSETS = {
  portal: local('portal-bg.svg'),
  curtainLeft: local('curtain-left.svg'),
  curtainRight: local('curtain-right.svg'),
  world: local('world-bg.svg'),
  clouds: local('clouds.svg'),
} as const

export const SCENE_ONE_CARDS = [
  { src: local('card-1.svg'), title: 'The Threshold', caption: 'Chapter I' },
  { src: local('card-2.svg'), title: 'Hollow Tide', caption: 'Chapter II' },
  { src: local('card-3.svg'), title: 'Emberfall', caption: 'Chapter III' },
] as const
