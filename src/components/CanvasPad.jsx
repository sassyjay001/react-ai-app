import { Brush, Eraser, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const COLORS = [
  '#1f2937',
  '#ef4444',
  '#f97316',
  '#facc15',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#ffffff',
]

export default function CanvasPad({ disabled, isGenerating, onChange, onGenerate }) {
  const canvasRef = useRef(null)
  const drawingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0 })
  const [activeColor, setActiveColor] = useState(COLORS[0])
  const [brushSize, setBrushSize] = useState(10)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = 760
    canvas.height = 760
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineCap = 'round'
    context.lineJoin = 'round'
  }, [])

  const pointFromEvent = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const source = event.touches?.[0] ?? event

    return {
      x: ((source.clientX - rect.left) / rect.width) * canvas.width,
      y: ((source.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const startDrawing = (event) => {
    event.preventDefault()
    drawingRef.current = true
    lastPointRef.current = pointFromEvent(event)
  }

  const draw = (event) => {
    if (!drawingRef.current) return
    event.preventDefault()

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const point = pointFromEvent(event)

    context.strokeStyle = activeColor
    context.lineWidth = brushSize
    context.beginPath()
    context.moveTo(lastPointRef.current.x, lastPointRef.current.y)
    context.lineTo(point.x, point.y)
    context.stroke()

    lastPointRef.current = point
    onChange(true)
  }

  const stopDrawing = () => {
    drawingRef.current = false
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    onChange(false)
  }

  const generate = () => {
    onGenerate(canvasRef.current.toDataURL('image/png'))
  }

  return (
    <section className="tool-panel draw-panel" aria-label="Doodle area">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Step 1</p>
          <h1>Draw your AImon</h1>
        </div>
        <Brush aria-hidden="true" />
      </div>

      <div className="toolbar" aria-label="Drawing controls">
        <div className="swatches" aria-label="Color swatches">
          {COLORS.map((color) => (
            <button
              aria-label={`Use ${color}`}
              className={color === activeColor ? 'swatch is-active' : 'swatch'}
              key={color}
              onClick={() => setActiveColor(color)}
              style={{ background: color }}
              title={color}
              type="button"
            />
          ))}
        </div>
        <label className="brush-control">
          <span>Brush</span>
          <input
            aria-label="Brush size"
            max="28"
            min="4"
            onChange={(event) => setBrushSize(Number(event.target.value))}
            type="range"
            value={brushSize}
          />
        </label>
      </div>

      <div className="canvas-wrap">
        <canvas
          aria-label="Drawing canvas"
          onMouseDown={startDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          onTouchStart={startDrawing}
          ref={canvasRef}
        />
      </div>

      <div className="action-row">
        <button className="button secondary" onClick={clearCanvas} type="button">
          <Eraser aria-hidden="true" />
          Clear
        </button>
        <button className="button primary" disabled={disabled} onClick={generate} type="button">
          <Sparkles aria-hidden="true" />
          {isGenerating ? 'Generating' : 'Generate'}
        </button>
      </div>
    </section>
  )
}
