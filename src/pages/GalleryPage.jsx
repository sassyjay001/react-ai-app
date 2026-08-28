import { SlidersHorizontal, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import CreatureCard from '../components/CreatureCard.jsx'
import { useAImonGallery } from '../hooks/useAImonGallery.js'

export default function GalleryPage() {
  const { clearGallery, data, likeCreature } = useAImonGallery()
  const [sortBy, setSortBy] = useState('newest')
  const [filterType, setFilterType] = useState('all')

  const types = useMemo(() => [...new Set(data.map((item) => item.type))].sort(), [data])

  const visibleCreatures = useMemo(() => {
    const filtered =
      filterType === 'all' ? data : data.filter((item) => item.type === filterType)

    return [...filtered].sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [data, filterType, sortBy])

  return (
    <section className="gallery-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Step 3</p>
          <h1>AImon Gallery</h1>
        </div>
        <div className="filters" aria-label="Gallery controls">
          <SlidersHorizontal aria-hidden="true" />
          <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value="newest">Newest</option>
            <option value="likes">Most liked</option>
            <option value="name">Name</option>
          </select>
          <select onChange={(event) => setFilterType(event.target.value)} value={filterType}>
            <option value="all">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className="icon-button" onClick={clearGallery} title="Clear gallery" type="button">
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      </div>

      {visibleCreatures.length === 0 ? (
        <div className="empty-state">
          <h2>No AImon yet</h2>
          <p>Generate a creature from the canvas and it will appear here.</p>
        </div>
      ) : (
        <div className="creature-grid">
          {visibleCreatures.map((creature) => (
            <CreatureCard creature={creature} key={creature.id} onLike={likeCreature} />
          ))}
        </div>
      )}
    </section>
  )
}
