'use client'

import { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

import { useDraw } from '@/hooks/draw'
import { Draw } from '@/lib/types'

const Home = () => {
  const [isHueWrapperShowing, setIsHueWrapperShowing] = useState(false)
  const [lineColor, setLineColor] = useState('#000')

  const drawLine = ({ previousPoint, currentPoint, context }: Draw) => {
    const { x, y } = currentPoint
    const lineWidth = 5

    const startPoint = previousPoint ?? currentPoint
    context.beginPath()
    context.lineWidth = lineWidth
    context.strokeStyle = lineColor
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(x, y)
    context.stroke()

    context.fillStyle = lineColor
    context.beginPath()
    context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    context.fill()
  }
  const { canvasReference, leaveMouseOverElement } = useDraw(drawLine)

  return (
    <div className="p-4 w-full mx-auto min-h-screen flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-8">
      <div className="relative top-2 flex items-end space-x-2">
        <div className="flex flex-col items-center">
          <label className="text-sm font-semibold" htmlFor="stroke">Stroke</label>
          <input
            className="w-8 h-8 border rounded-md cursor-pointer"
            id="stroke"
            type="button"
            style={{ backgroundColor: lineColor }}
            onClick={() => setIsHueWrapperShowing(!isHueWrapperShowing)}
          />
        </div>
        <HexColorInput
          className="px-2 h-8 border border-solid rounded-md bg-transparent text-black focus:ring focus:ring-offset-2"
          prefixed
          color={lineColor}
          onChange={setLineColor}
        />
      </div>

      {isHueWrapperShowing && (
        <div className="absolute left-2 top-[15rem] hue-wrapper p-4 bg-zinc-800 rounded-md">
          <HexColorPicker color={lineColor} onChange={setLineColor} />
        </div>
      )}

      <canvas
        className="border rounded-md"
        ref={canvasReference}
        onMouseDown={leaveMouseOverElement}
      />
    </div>
  )
}

export default Home
