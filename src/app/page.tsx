'use client'

import { useCallback, useEffect } from 'react'

import { DropdownMenu } from '@/components'
import { useDraw } from '@/hooks/draw'
import { useWindowSize } from '@/hooks/windowSize'
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
  const { width, height } = useWindowSize()
  const { canvasReference, leaveMouseOverElement, clearCanvas } = useDraw(drawLine)

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
    link.download = 'art.png'
    link.href = dataURL
    link.click()
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
      <header className="z-20 fixed top-4 inset-x-2">
        <DropdownMenu handlers={handlers} />
      </header>
      <div className="p-4 w-full mx-auto min-h-screen flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-8">
        <canvas
          className="select-none absolute inset-0 z-10"
          ref={canvasReference}
          onMouseDown={leaveMouseOverElement}
          width={width}
          height={height}
        />
      </div>
    </>
  )
}

export default Home
