import type { Preset } from 'unocss'
import type { IOptions } from './common'
import {
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import {
  presetBgImage,
  presetEllipsis,
  presetIcon,
  presetSafearea,
  presetShortcuts,
  presetWh,
} from './common'

/**
 * preset for web
 */
export function presetWeb(options: IOptions = {}): Preset {
  return {
    name: 'uno-preset-web',
    presets: [
      presetWind3(),
      presetShortcuts(options),
      presetSafearea(),
      presetEllipsis(),
      presetBgImage(),
      presetIcon(options),
      presetWh(),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  }
}
