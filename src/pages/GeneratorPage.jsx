import { CheckCircle2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import CanvasPad from '../components/CanvasPad.jsx'
import Spinner from '../components/Spinner.jsx'
import { generateCreatureFromDoodle } from '../data/creatureFactory.js'
import { useAImonGallery } from '../hooks/useAImonGallery.js'

export default function GeneratorPage() {
  const { saveCreature } = useAImonGallery()
  const [hasDoodle, setHasDoodle] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [saved, setSaved] = useState(false)

  const handleGenerate = async (doodleDataUrl) => {
    setSaved(false)
    setIsGenerating(true)

    window.setTimeout(() => {
      const creature = generateCreatureFromDoodle(doodleDataUrl)
      setLastResult(creature)
      saveCreature(creature)
      setSaved(true)
      setIsGenerating(false)
    }, 900)
  }

  return (
    <div className="generator-grid">
      <CanvasPad
        disabled={!hasDoodle || isGenerating}
        isGenerating={isGenerating}
        onChange={setHasDoodle}
        onGenerate={handleGenerate}
      />

      <section className="tool-panel result-panel" aria-label="AImon result">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Step 2</p>
            <h1>Meet the result</h1>
          </div>
          <Sparkles aria-hidden="true" />
        </div>

        <div className="result-stage">
          {isGenerating ? (
            <Spinner label="Generating your AImon" />
          ) : lastResult ? (
            <img alt={lastResult.name} src={lastResult.imageUrl} />
          ) : (
            <div className="placeholder-copy">
              <Sparkles aria-hidden="true" />
              <h2>Your generated AImon appears here</h2>
              <p>Draw a simple shape, symbol, or character outline, then generate.</p>
            </div>
          )}
        </div>

        {lastResult && !isGenerating && (
          <div className="result-details">
            <div className="result-title">
              <div>
                <h2>{lastResult.name}</h2>
                <span className="type-pill">{lastResult.type}</span>
              </div>
              {saved && (
                <span className="saved-note">
                  <CheckCircle2 aria-hidden="true" />
                  Saved
                </span>
              )}
            </div>
            <p>{lastResult.characteristics}</p>
            <div className="power-list">
              {lastResult.powers.map((power) => (
                <div className="power-item" key={power.name}>
                  <Sparkles aria-hidden="true" />
                  <span>
                    <strong>{power.name}</strong> {power.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
