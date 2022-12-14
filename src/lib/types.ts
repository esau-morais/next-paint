export type Point = {
  x: number
  y: number
}

export type Draw = {
  context: CanvasRenderingContext2D
  currentPoint: Point
  previousPoint: Point | null
}
