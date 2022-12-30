import { useEffect, useRef, useState } from 'react'

import { Draw, Point } from '@/lib/types'

export const useDraw = (onDraw: ({ context, currentPoint, previousPoint }: Draw) => void) => {
  const [isMouseOverElement, setIsMouseOverElement] = useState(false)

  const canvasReference = useRef<HTMLCanvasElement | null>(null)
  const canvasElement = canvasReference.current 
  const previousPointReference = useRef<Point | null>(null)

  const leaveMouseOverElement = () => setIsMouseOverElement(true)

  useEffect(() => {
    const computePointInCanvas = (event: MouseEvent) => {
      if (!canvasElement) return

      const rectangle = canvasElement.getBoundingClientRect()
      const x = event.clientX - rectangle.left
      const y = event.clientY - rectangle.top

      return { x, y }
    }
    const handleCurrentPointChange = (event: MouseEvent) => {
      if (!isMouseOverElement) return
      const currentPoint = computePointInCanvas(event)

      const context = canvasElement?.getContext('2d')
      if (!context || !currentPoint) return

      onDraw({ context, currentPoint, previousPoint: previousPointReference.current })
      previousPointReference.current = currentPoint
    }

    const handleMouseLeave = () => {
      setIsMouseOverElement(false)
      previousPointReference.current = null
    }

    window.addEventListener('beforeunload', () => {
      if (!canvasElement) return

      localStorage.setItem('canvas', canvasElement.toDataURL())
    })
    // desktop support
    canvasElement?.addEventListener('mousemove', handleCurrentPointChange)
    window.addEventListener('mouseup', handleMouseLeave)
    // TODO: add mobile support

    return () => {
      window.removeEventListener('beforeunload', () => {
        if (!canvasElement) return

        localStorage.removeItem('canvas')
      })
      canvasElement?.removeEventListener('mousemove', handleCurrentPointChange)
      window.removeEventListener('mouseup', handleMouseLeave)
    }
  }, [canvasElement, isMouseOverElement, onDraw])

  return { canvasReference, leaveMouseOverElement }
}
