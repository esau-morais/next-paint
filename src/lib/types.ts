import { ReactNode } from 'react'

export type Point = {
  x: number
  y: number
}

export type Draw = {
  context: CanvasRenderingContext2D
  currentPoint: Point
  previousPoint: Point | null
}

export type Item = {
  id: number
  icon?: ReactNode 
  label: string 
  handler: () => void
}
