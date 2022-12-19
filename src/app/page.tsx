'use client'

import { DropdownMenu } from '@/components'
import { useDraw } from '@/hooks/draw'
import { Draw } from '@/lib/types'

const Home = () => {
  if (typeof window === 'undefined') return

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
  const { canvasReference, leaveMouseOverElement, clearCanvas } = useDraw(drawLine)

  const handlers = [
    {
      clearCanvas 
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
          width={window.innerWidth ?? 0}
          height={window.innerHeight ?? 0}
        />
      </div>
    </>
  )
}

export default Home
