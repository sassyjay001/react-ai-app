import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('aimon-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('aimon-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
