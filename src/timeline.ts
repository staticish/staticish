/** Total height of the scroll track. The stage stays pinned for all of it. */
export const SCENE_HEIGHT_VH = 480

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** Normalised progress across a sub-range of the master timeline. */
export const range = (p: number, from: number, to: number) => clamp01((p - from) / (to - from))

/** Smoothstep — the easing the whole scene is built on. */
export const ease = (t: number) => t * t * (3 - 2 * t)

/** Eased progress across a sub-range. */
export const seg = (p: number, from: number, to: number) => ease(range(p, from, to))

export const mix = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * The master timeline. Every layer reads its own state from one scroll value so
 * the beats stay locked together:
 *
 *   0.00 → 0.26  curtains sweep offscreen
 *   0.00 → 0.62  the camera accelerates through the portal
 *   0.14 → 0.46  scene one fades away
 *   0.26 → 0.90  world and clouds settle in behind the portal
 *   0.60 → 1.00  scene two arrives and the wheel turns
 */
export function timeline(p: number) {
  const dive = seg(p, 0, 0.62)

  return {
    /** 0 = drawn shut, 1 = fully offstage. */
    curtains: seg(p, 0, 0.26),
    /** Exponential so the last stretch of the dive reads as acceleration. */
    portalScale: 1 + Math.pow(dive, 2.6) * 15,
    /* Cross-fades into the world as the dive tops out. */
    portalOpacity: 1 - seg(p, 0.34, 0.56),
    sceneOneOpacity: 1 - seg(p, 0.14, 0.46),
    sceneOneLift: seg(p, 0.14, 0.46),
    worldScale: mix(1.55, 1.0, seg(p, 0.26, 0.9)),
    worldOpacity: seg(p, 0.28, 0.5),
    cloudScale: mix(2.4, 1.05, seg(p, 0.26, 0.95)),
    cloudOpacity: seg(p, 0.28, 0.48) * (1 - seg(p, 0.9, 1) * 0.35),
    /** Scene two reveal. */
    sceneTwo: seg(p, 0.6, 0.76),
    /** Drives the ferris wheel rotation for the rest of the scroll. */
    wheel: range(p, 0.62, 1),
  }
}

export type Timeline = ReturnType<typeof timeline>
