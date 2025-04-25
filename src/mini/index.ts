import type { Preset } from 'unocss'
import type { IOptions } from '../common'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  presetBgImage,
  presetEllipsis,
  presetIcon,
  presetSafearea,
  presetShortcuts,
  presetWh,
} from '../common'

/**
 * preset for uni app
 */
export function presetMini(options: IOptions = {}): Preset {
  return {
    name: 'uno-preset-mini',
    presets: [
      presetUni({
        uno: true,
        remRpx: true,
        attributify: {
          prefixedOnly: true,
        },
      }),
      presetShortcuts(),
      presetSafearea(),
      presetEllipsis(),
      presetBgImage(),
      presetIcon(options),
      presetWh(),
    ],
    blocklist: [
      'tab',
      'block',
      'container',
      /size-.*/,
    ],
  }
}
