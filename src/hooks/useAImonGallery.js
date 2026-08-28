import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'pokaimon-gallery'

function readGallery() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeGallery(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useAImonGallery() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(readGallery())
  }, [])

  const saveCreature = useCallback((creature) => {
    setData((current) => {
      const next = [creature, ...current]
      writeGallery(next)
      return next
    })
  }, [])

  const likeCreature = useCallback((id) => {
    setData((current) => {
      const next = current.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item,
      )
      writeGallery(next)
      return next
    })
  }, [])

  const clearGallery = useCallback(() => {
    writeGallery([])
    setData([])
  }, [])

  return { clearGallery, data, likeCreature, saveCreature }
}
