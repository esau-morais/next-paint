import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleSizeChange = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleSizeChange)

    handleSizeChange()

    return () => window.removeEventListener('resize', handleSizeChange)
  }, [])

  return windowSize
}
