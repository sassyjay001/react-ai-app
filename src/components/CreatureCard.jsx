import { Heart, Zap } from 'lucide-react'

export default function CreatureCard({ creature, onLike }) {
  return (
    <article className="creature-card">
      <div className="creature-image">
        <img alt={creature.name} src={creature.imageUrl} />
      </div>
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{creature.name}</h3>
            <span className="type-pill">{creature.type}</span>
          </div>
          <button
            aria-label={`Like ${creature.name}`}
            className="icon-button like-button"
            onClick={() => onLike(creature.id)}
            title="Like"
            type="button"
          >
            <Heart aria-hidden="true" />
            <span>{creature.likes}</span>
          </button>
        </div>
        <p>{creature.characteristics}</p>
        <div className="power-list">
          {creature.powers.map((power) => (
            <div className="power-item" key={power.name}>
              <Zap aria-hidden="true" />
              <span>
                <strong>{power.name}</strong> {power.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
