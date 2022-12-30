'use client'

import { useCallback, useEffect } from 'react'

import { Canvas, DropdownMenu } from '@/components'
import { useDraw } from '@/hooks/draw'
import { Draw } from '@/lib/types'

const drawLine = ({ previousPoint, currentPoint, context }: Draw) => {
  const { x, y } = currentPoint
  const lineWidth = 5

  const startPoint = previousPoint ?? currentPoint
  context.beginPath()
  context.lineWidth = lineWidth
  // TODO: set custom line color
  context.strokeStyle = '#000' 
  context.moveTo(startPoint.x, startPoint.y)
  context.lineTo(x, y)
  context.stroke()

  context.fillStyle = '#000' 
  context.beginPath()
  context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
  context.fill()
}

const Home = () => {
  const { canvasReference, leaveMouseOverElement } = useDraw(drawLine)

  useEffect(() => {
    const canvas = canvasReference.current
    if (!canvas) return

    const savedCanvasDataURL = localStorage.getItem('canvas')
    if (savedCanvasDataURL) {
      const image = new Image()
      image.src = savedCanvasDataURL
      image.onload = () => {
        canvas.getContext('2d')?.drawImage(image, 0, 0)
      }
    }
  }, [canvasReference])

  const downloadCanvas = useCallback(() => {
    const dataURL = canvasReference.current?.toDataURL() ?? ''
    const link = document.createElement('a')
    // TODO: give user the right to rename the file
    link.download = 'art.png'
    link.href = dataURL
    link.click()
  }, [canvasReference])

  const clearCanvas = useCallback(() => {
    const canvasElement = canvasReference.current
    if (!canvasElement) return
    const context = canvasElement.getContext('2d')

    if (!context) return
    context.clearRect(0, 0, canvasElement.width, canvasElement.height)
    localStorage.removeItem('canvas')
  }, [canvasReference])

  const handlers = [
    {
      handler: downloadCanvas 
    },
    {
      handler: clearCanvas 
    }
  ]

  return (
    <>
      <header className="z-20 fixed top-4 inset-x-4">
        <DropdownMenu handlers={handlers} />
      </header>
      <Canvas ref={canvasReference} onMouseDown={leaveMouseOverElement} />
    </>
  )
}

export default Home
