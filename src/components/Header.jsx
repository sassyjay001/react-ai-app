import { Moon, PencilLine, Sun, Images } from 'lucide-react'
import { useTheme } from '../context/theme.js'

export default function Header({ activeRoute }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark">AI</span>
        <span>PokAImon Generator</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a className={activeRoute === 'generator' ? 'active' : ''} href="#/">
          <PencilLine aria-hidden="true" />
          Generator
        </a>
        <a className={activeRoute === 'gallery' ? 'active' : ''} href="#/gallery">
          <Images aria-hidden="true" />
          Gallery
        </a>
        <button
          aria-label="Toggle color theme"
          className="icon-button"
          onClick={toggleTheme}
          title="Toggle theme"
          type="button"
        >
          {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}
