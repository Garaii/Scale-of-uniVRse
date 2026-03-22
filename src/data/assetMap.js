import rawCsv from './assets_metadata.csv?raw'

// Eagerly import all PNGs so Vite bundles them with hashed URLs
const images = import.meta.glob('./assets/*.png', { eager: true })

// Build name → filename lookup from the CSV (columns: filename, name, ...)
const _nameToFile = {}
rawCsv.trim().split('\n').slice(1).forEach(line => {
  const m = line.match(/^([^,]+),([^,]+)/)
  if (m) _nameToFile[m[2].trim()] = m[1].trim()
})

/**
 * Returns the bundled image URL for a given object name, or null if not found.
 * @param {string} objectName  e.g. "Ant", "Andromeda Galaxy"
 */
export function getAssetUrl(objectName) {
  const filename = _nameToFile[objectName]
  if (!filename) return null
  return images[`./assets/${filename}`]?.default ?? null
}
