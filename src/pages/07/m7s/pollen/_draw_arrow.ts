import type { Container } from 'pixi.js'

import { Graphics } from 'pixi.js'

import { YmToPx } from '@/pixi/scale.ts'

export function drawArrow(
  container: Container<any>,
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: number,
  shrinkRatio: number = 1,
  headLength: number = 1,
  lineWidth?: number,
  strokeColor?: number,
) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const angle = Math.atan2(dy, dx)

  const length = Math.sqrt(dx * dx + dy * dy)
  const shrinkDist = length * (1 - shrinkRatio)
  const dirX = dx / length
  const dirY = dy / length

  const shortTo = {
    x: to.x - dirX * shrinkDist,
    y: to.y - dirY * shrinkDist,
  }

  let width_of_line = 0.3
  if (lineWidth) {
    width_of_line = lineWidth
  }

  const lines = new Graphics()
  lines.rect(
    (from.x - headLength) * YmToPx,
    (from.y - width_of_line / 2) * YmToPx,
    length * YmToPx,
    width_of_line * YmToPx,
  )
  lines.fill({ color: '#db2777' })
  if (strokeColor) {
    lines.stroke(strokeColor)
  }
  lines.pivot.set(0, 0)
  lines.rotation = angle
  container.addChild(lines)

  const arrow = new Graphics()
  // arrow.lineStyle(4, color)
  // arrow.moveTo(shortFrom.x * YmToPx, shortFrom.y * YmToPx)
  // arrow.lineTo(shortTo.x * YmToPx, shortTo.y * YmToPx)

  // 箭头头部三角形
  const arrowSize = 1.0
  const endX = shortTo.x * YmToPx
  const endY = shortTo.y * YmToPx

  const leftX = endX - arrowSize * YmToPx * Math.cos(angle - Math.PI / 8)
  const leftY = endY - arrowSize * YmToPx * Math.sin(angle - Math.PI / 8)
  const rightX = endX - arrowSize * YmToPx * Math.cos(angle + Math.PI / 8)
  const rightY = endY - arrowSize * YmToPx * Math.sin(angle + Math.PI / 8)

  arrow.moveTo(endX, endY)
  arrow.lineTo(leftX, leftY)
  arrow.lineTo(rightX, rightY)
  arrow.closePath()
  if (strokeColor) {
    arrow.stroke({ color: strokeColor, width: 2 })
  }
  arrow.fill(color)
  container.addChild(arrow)
}
