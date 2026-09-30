import type { DemoState } from './demo-data'
import { initialDemoState } from './demo-data'

const legacyAssets = new Set(['/demo/form-and-light.svg', '/demo/working-rhythm.svg', '/demo/meeting-point.svg', '/demo/horizon.svg'])

/** Upgrade only bundled artwork, keeping saved content and user uploads intact. */
export function refreshDemoArtwork(state: DemoState): DemoState {
  return {
    ...state,
    media: state.media.map((asset) => {
      if (!legacyAssets.has(asset.url)) return asset
      const replacement = initialDemoState.media.find((item) => item.id === asset.id)
      return replacement ? { ...asset, url: replacement.url, alt: replacement.alt, size: replacement.size } : asset
    }),
  }
}
