import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const tokensBuild = join(repoRoot, '..', 'nebula-ds-tokens', 'build')

const OUT_DIR = join(repoRoot, 'src', 'styles')

const THEMES = ['light', 'dark']

const parseVariables = (css) => {
  const vars = {}
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi
  let match
  while ((match = re.exec(css)) !== null) {
    vars[match[1].trim()] = match[2].trim()
  }
  return vars
}

const formatValue = (value) => value.replace(/\/\*[^*]*\*\//g, '').trim()

const cssBlock = (vars, header, selector = null) => {
  const lines = Object.entries(vars)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `  ${name}: ${value};`)
  if (!lines.length) return ''
  const headerComment = `/*\n * Auto-generated from nebula-ds-tokens ${header}\n * Do not edit directly; run \`pnpm generate-themes\`.\n */\n`
  const body = lines.join('\n')
  return selector ? `${headerComment}\n${selector} {\n${body}\n}\n` : `${headerComment}\n${body}\n`
}

const readThemeCss = (theme) => readFileSync(join(tokensBuild, `${theme}-variables.css`), 'utf8')

const light = parseVariables(readThemeCss('light'))
const dark = parseVariables(readThemeCss('dark'))

const allNames = new Set([...Object.keys(light), ...Object.keys(dark)])

const primitives = {}
const themeVars = { light: {}, dark: {} }

for (const name of allNames) {
  const lightValue = formatValue(light[name])
  const darkValue = formatValue(dark[name])

  if (lightValue === darkValue) {
    primitives[name] = lightValue
  } else {
    themeVars.light[name] = lightValue
    themeVars.dark[name] = darkValue
  }
}

mkdirSync(join(OUT_DIR, 'tokens'), { recursive: true })
mkdirSync(join(OUT_DIR, 'themes'), { recursive: true })

writeFileSync(
  join(OUT_DIR, 'tokens', 'primitives.css'),
  cssBlock(primitives, 'primitives (theme-invariant)', ':root')
)

for (const theme of THEMES) {
  // light: :root is the no-provider default fallback; :where() keeps zero
  // specificity for scoped wrappers. dark: the :root[data-nb-theme="dark"]
  // rule outranks light's :root fallback when the attribute sits on <html>.
  const selector =
    theme === 'light'
      ? ':root, :where([data-nb-theme="light"])'
      : ':where([data-nb-theme="dark"]), :root[data-nb-theme="dark"]'
  writeFileSync(
    join(OUT_DIR, 'themes', `${theme}.css`),
    cssBlock(themeVars[theme], `${theme} semantic tokens`, selector)
  )
}

const manifest = {
  source: {
    package: 'nebula-ds-tokens@0.2.0',
    files: THEMES.map((theme) => `${theme}-variables.css`),
  },
  generatedAt: new Date().toISOString(),
  primitives: Object.keys(primitives).sort(),
  themes: THEMES.reduce((acc, theme) => {
    acc[theme] = Object.keys(themeVars[theme]).sort()
    return acc
  }, {}),
}

writeFileSync(
  join(OUT_DIR, 'tokens', 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`
)

console.log(`primitives: ${Object.keys(primitives).length}`)
for (const theme of THEMES) {
  console.log(`${theme}: ${Object.keys(themeVars[theme]).length}`)
}
