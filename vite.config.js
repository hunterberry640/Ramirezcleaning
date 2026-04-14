import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

function findHtmlFiles(dir, prefix, base = dir) {
  const results = {}
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry)
    if (statSync(full).isDirectory()) {
      Object.assign(results, findHtmlFiles(full, prefix, base))
    } else if (entry.endsWith('.html')) {
      const rel = full.replace(base + '\\', '').replace(base + '/', '').replace(/[\\/]/g, '_').replace('.html', '')
      results[prefix + '_' + rel] = full
    }
  }
  return results
}

const enPages = findHtmlFiles(resolve(__dirname, 'en'), 'en')
const esPages = findHtmlFiles(resolve(__dirname, 'es'), 'es')

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        ...enPages,
        ...esPages,
      },
    },
  },
})
