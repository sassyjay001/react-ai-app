const TYPES = [
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Psychic',
  'Steel',
  'Ghost',
  'Fairy',
  'Dragon',
  'Rock',
]

const NAME_STARTS = ['Zor', 'Mika', 'Talo', 'Nimbi', 'Kora', 'Vex', 'Luma', 'Pyro', 'Quill', 'Astra']
const NAME_ENDS = ['fin', 'bolt', 'mora', 'wing', 'bloom', 'fang', 'drift', 'spark', 'shade', 'whirl']

const TYPE_COLORS = {
  Dragon: ['#7c3aed', '#22d3ee'],
  Electric: ['#facc15', '#38bdf8'],
  Fairy: ['#f472b6', '#a7f3d0'],
  Fire: ['#ef4444', '#f97316'],
  Ghost: ['#6366f1', '#111827'],
  Grass: ['#22c55e', '#84cc16'],
  Psychic: ['#ec4899', '#8b5cf6'],
  Rock: ['#78716c', '#f59e0b'],
  Steel: ['#64748b', '#cbd5e1'],
  Water: ['#0ea5e9', '#14b8a6'],
}

function hashString(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash >>> 0)
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length]
}

function buildSvg({ accent, body, name, seed, type }) {
  const ears = seed % 3
  const tailFlip = seed % 2 === 0 ? 1 : -1
  const eyeShape = seed % 4 === 0 ? '9' : '6'
  const pattern = seed % 5

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <defs>
        <radialGradient id="arena" cx="50%" cy="35%" r="65%">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset=".55" stop-color="${accent}" stop-opacity=".22"/>
          <stop offset="1" stop-color="#111827"/>
        </radialGradient>
        <linearGradient id="body" x1="20%" x2="80%" y1="20%" y2="80%">
          <stop offset="0" stop-color="${body}"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="22" stdDeviation="16" flood-color="#111827" flood-opacity=".32"/>
        </filter>
      </defs>
      <rect width="640" height="640" fill="url(#arena)"/>
      <ellipse cx="320" cy="516" rx="230" ry="52" fill="#111827" opacity=".2"/>
      <g filter="url(#shadow)">
        <path d="M${tailFlip === 1 ? '438 360 C540 298 572 406 492 438' : '202 360 C100 298 68 406 148 438'}" fill="none" stroke="${accent}" stroke-width="44" stroke-linecap="round"/>
        ${ears === 0 ? '<path d="M232 196 192 94l96 58zm176 0 40-102-96 58z" fill="url(#body)"/>' : ''}
        ${ears === 1 ? '<path d="M248 172c-34-72-8-118 44-60M392 172c34-72 8-118-44-60" fill="none" stroke="url(#body)" stroke-width="38" stroke-linecap="round"/>' : ''}
        ${ears === 2 ? '<circle cx="234" cy="144" r="44" fill="url(#body)"/><circle cx="406" cy="144" r="44" fill="url(#body)"/>' : ''}
        <ellipse cx="320" cy="330" rx="156" ry="182" fill="url(#body)"/>
        <ellipse cx="260" cy="326" rx="28" ry="${eyeShape}" fill="#0f172a"/>
        <ellipse cx="380" cy="326" rx="28" ry="${eyeShape}" fill="#0f172a"/>
        <circle cx="270" cy="318" r="7" fill="#fff"/>
        <circle cx="390" cy="318" r="7" fill="#fff"/>
        <path d="M286 392c28 26 66 26 94 0" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
        <path d="M210 438c-66 56-56 112 34 90M430 438c66 56 56 112-34 90" fill="none" stroke="${body}" stroke-width="34" stroke-linecap="round"/>
        ${pattern === 0 ? '<path d="M320 224v78m-60-38h120" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".55"/>' : ''}
        ${pattern === 1 ? '<circle cx="320" cy="244" r="42" fill="#fff" opacity=".4"/><circle cx="320" cy="244" r="18" fill="#0f172a" opacity=".25"/>' : ''}
        ${pattern === 2 ? '<path d="M230 276c60-38 120-38 180 0" fill="none" stroke="#fff" stroke-width="20" opacity=".45" stroke-linecap="round"/>' : ''}
        ${pattern === 3 ? '<path d="M274 230 344 382h-58l80-152" fill="none" stroke="#fff" stroke-width="18" opacity=".48" stroke-linecap="round" stroke-linejoin="round"/>' : ''}
        ${pattern === 4 ? '<circle cx="254" cy="250" r="18" fill="#fff" opacity=".38"/><circle cx="386" cy="250" r="18" fill="#fff" opacity=".38"/><circle cx="320" cy="436" r="24" fill="#fff" opacity=".28"/>' : ''}
      </g>
      <text x="320" y="586" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#fff">${name} · ${type}</text>
    </svg>
  `
}

export function generateCreatureFromDoodle(doodleDataUrl) {
  const seed = hashString(doodleDataUrl)
  const type = pick(TYPES, seed)
  const secondaryType = pick(TYPES, seed, 4)
  const name = `${pick(NAME_STARTS, seed)}${pick(NAME_ENDS, seed, 7)}`
  const [body, accent] = TYPE_COLORS[type]
  const powers = [
    {
      name: `${type} Rush`,
      description: `${name} turns sketch energy into a fast arena strike.`,
    },
    {
      name: `${secondaryType} Guard`,
      description: `${name} bends the doodle lines into a protective burst.`,
    },
  ]
  const characteristics = `${name} is a ${type.toLowerCase()}-leaning battle creature with a polished silhouette inspired by your doodle.`
  const svg = buildSvg({ accent, body, name, seed, type })
  const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

  return {
    characteristics,
    createdAt: new Date().toISOString(),
    doodleDataUrl,
    id: crypto.randomUUID(),
    imageUrl,
    likes: 0,
    name,
    powers,
    type,
  }
}
