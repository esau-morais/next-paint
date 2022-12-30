import { CanvasHTMLAttributes, DetailedHTMLProps, forwardRef, RefObject } from 'react'

import { useWindowSize } from '@/hooks/windowSize'

type CanvasProps = {
  ref: RefObject<HTMLCanvasElement>
  onMouseDown: () => void 
} & DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ onMouseDown }, ref) => {
  const { width, height } = useWindowSize()

  return (
    <div className="p-4 w-full mx-auto min-h-screen flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-8">
      <canvas
        data-testid="canvas"
        className="select-none absolute inset-0 z-10"
        ref={ref}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
      />
    </div>
  )
})

Canvas.displayName = 'canvas'

export default Canvas
