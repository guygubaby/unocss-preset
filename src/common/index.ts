import type { Awaitable, Preset } from 'unocss'
import {
  toEscapedSelector as e,
  presetIcons as rawPresetIcons,
} from 'unocss'

export function presetWh(): Preset {
  return {
    name: 'uno-preset-wh',
    autocomplete: {
      templates: [
        '(wh|hw)-(full|screen)',
      ],
    },
    rules: [
      [/(?:hw|wh)-([^\s'"]+)$/, ([, name], { rawSelector }) => {
        const selector = e(rawSelector)

        const isFull = name === 'full'
        if (isFull) {
          return `
            ${selector} {
              width: 100%;
              height: 100%;
            }
          `
        }

        const isScreen = name === 'screen'
        if (isScreen) {
          return `
            ${selector} {
              width: 100vw;
              height: 100vh;
            }
          `
        }

        // name is $foo / $gap
        const isVariable = name.startsWith('$')
        if (isVariable) {
          const val = name.slice(1)
          return `
            ${selector} {
              width: var(--${val});
              height: var(--${val});
            }
          `
        }

        // name is [10px] / [2rem]
        const isNumerable = name.startsWith('[') && name.endsWith(']')
        if (isNumerable) {
          const val = name.slice(1, -1)
          return `
            ${selector} {
              width: ${val};
              height: ${val};
            }
          `
        }

        const numerableVal = Number(name)
        const isNumber = !Number.isNaN(numerableVal)
        const val = isNumber ? `${numerableVal / 4}rem` : name

        return `
            ${selector} {
              width: ${val};
              height: ${val};
            }
          `
      }],
    ],
  }
}

/**
 * Custom icon loader, used by `getCustomIcon`.
 */
type CustomIconLoader = (name: string) => Awaitable<string | undefined>

/**
 * List of icons as object. Key is the icon name, the value is the icon data or callback (can be async) to get icon data
 */
type InlineCollection = Record<string, string | (() => Awaitable<string | undefined>)>

export interface IOptions {
  useShortcuts?: boolean
  useIcon?: boolean
  useCdnIcon?: boolean
  iconCollection?: Record<string, (() => Awaitable<any>) | CustomIconLoader | InlineCollection | undefined> | undefined
  extraProperties?: Record<string, string>
}

export function presetShortcuts(options: IOptions = {}): Preset {
  options.useShortcuts ??= true
  return {
    name: 'uno-preset-shortcuts',
    shortcuts: options.useShortcuts
      ? [
          ['fc', 'flex justify-center items-center'],
          ['shadow-dim', 'shadow-[0px_2px_10px_0px_rgba(38,44,71,0.16)]'],
        ]
      : [],
  }
}

export function presetSafearea(): Preset {
  return {
    name: 'uno-preset-safearea',
    rules: [
      [
        /^safe-area-(top|bottom)$/,
        ([_, name], { rawSelector }) => {
          const selector = e(rawSelector)

          return `
            ${selector} {
              padding-${name}: constant(safe-area-inset-${name});
              padding-${name}: env(safe-area-inset-${name});
            }
          `
        },
      ],
    ],
    autocomplete: {
      templates: [
        '(safe-area)-(top|bottom)',
      ],
    },
  }
}

export function presetBgImage(): Preset {
  return {
    name: 'uno-preset-bg-image',
    rules: [
      [/^bg-image$/, ([, _]) => {
        return {
          'background-size': '100% 100%',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
        }
      }],
    ],
  }
}

export function presetEllipsis(): Preset {
  return {
    name: 'uno-preset-ellipsis',
    autocomplete: {
      templates: [
        'ellipsis-(2|3|4|5|6|7|8|9|10)',
      ],
    },
    rules: [
      [/^ellipsis-(\d+)/, ([, lineCount], { rawSelector }) => {
        const selector = e(rawSelector)
        return `
        ${selector} {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: ${lineCount};
          line-break: anywhere;
          -webkit-box-orient: vertical;
        }
      `
      }],
    ],
  }
}

export function presetIcon(options: IOptions = {}): Preset {
  options.useIcon ??= true
  options.useCdnIcon ??= true
  options.iconCollection ??= {}
  options.extraProperties ??= {
    'display': 'inline-block',
    'vertical-align': 'middle',
  }
  const iconCollection = options.iconCollection || {}

  const presets: Preset[] = []
  const icon = rawPresetIcons({
    scale: 1.2,
    extraProperties: options.extraProperties,
    cdn: options.useCdnIcon ? 'https://esm.sh/' : undefined,
    collections: iconCollection,
  })

  if (options.useIcon)
    presets.push(icon)

  return {
    name: 'uno-preset-my-icon',
    presets,
  }
}
