import type { Container } from 'pixi.js'

import { Graphics } from 'pixi.js'

import { YmToPx } from '@/pixi/scale.ts'

export function drawArrow(
  container: Container<any>,
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: number,
  shrinkRatio: number,
) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const angle = Math.atan2(dy, dx)

  const length = Math.sqrt(dx * dx + dy * dy)
  const shrinkDist = length * (1 - shrinkRatio)
  const dirX = dx / length
  const dirY = dy / length
  const shortFrom = {
    x: from.x + dirX * shrinkDist,
    y: from.y + dirY * shrinkDist,
  }
  const shortTo = {
    x: to.x - dirX * shrinkDist,
    y: to.y - dirY * shrinkDist,
  }

  const arrow = new Graphics()
  arrow.lineStyle(4, color)
  arrow.moveTo(shortFrom.x * YmToPx, shortFrom.y * YmToPx)
  arrow.lineTo(shortTo.x * YmToPx, shortTo.y * YmToPx)

  // 箭头头部三角形
  const arrowSize = 1.0
  const endX = shortTo.x * YmToPx
  const endY = shortTo.y * YmToPx

  const leftX = endX - arrowSize * YmToPx * Math.cos(angle - Math.PI / 8)
  const leftY = endY - arrowSize * YmToPx * Math.sin(angle - Math.PI / 8)
  const rightX = endX - arrowSize * YmToPx * Math.cos(angle + Math.PI / 8)
  const rightY = endY - arrowSize * YmToPx * Math.sin(angle + Math.PI / 8)

  arrow.beginFill(color)
  arrow.moveTo(endX, endY)
  arrow.lineTo(leftX, leftY)
  arrow.lineTo(rightX, rightY)
  arrow.closePath()
  arrow.endFill()

  container.addChild(arrow)
}
