import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Spinner from './components/Spinner.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

const GeneratorPage = lazy(() => import('./pages/GeneratorPage.jsx'))
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))

function getRoute() {
  return window.location.hash === '#/gallery' ? 'gallery' : 'generator'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <ThemeProvider>
      <div className="app-shell">
        <Header activeRoute={route} />
        <main className="page-frame">
          <Suspense fallback={<Spinner label="Loading page" />}>
            {route === 'gallery' ? <GalleryPage /> : <GeneratorPage />}
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  )
}
