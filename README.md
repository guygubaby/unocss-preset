# Opinionated Unocss Preset

## Install
To get started with Unocss Preset, follow these simple steps:

### 1. Install Unocss
```bash
pnpm i -D unocss @bryce-loskie/unocss-preset
```

### 2. Configure Unocss to use the preset.
In your project's Unocss configuration file (usually named ),
import the preset and add it to the section:`unocss.config.[jt]s`

```ts
// uno.config.ts
import { presetWeb } from '@bryce-loskie/unocss-preset'
import { presetMini } from '@bryce-loskie/unocss-preset/mini' // for uniapp only
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWeb(), // for web
    presetMini(), // for uniapp
  ],
})
```

## License

[MIT](./LICENSE) License &copy; 2025-PRESENT [guygubaby](https://github.com/guygubaby/unocss-preset-mini)
