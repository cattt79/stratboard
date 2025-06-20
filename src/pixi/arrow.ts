import type { Container } from 'pixi.js'

import { Graphics } from 'pixi.js'

import { YmToPx } from '@/pixi/scale.ts'

const defaultLineWidth = 0.5 * YmToPx
const defaultHeadLength = 2 * YmToPx

/**
 * 画箭头，所有尺寸传入时都无需乘上YmToPx
 * @param container 要画箭头的container容器
 * @param from 箭头的起点坐标
 * @param to 箭头的终点坐标
 * @param color 箭头的颜色，默认为白色0xffffff
 * @param lineWidth 箭头线条的宽度，默认为0.5
 * @param headLength 箭头头部三角形的大小，默认为2
 * @param strokeColor 箭头描边的颜色，不传入则没有描边
 */
export function drawArrow(
  container: Container<any>,
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: number = 0xffffff,
  lineWidth?: number,
  headLength?: number,
  strokeColor?: number,
) {
  const dx = (to.x - from.x) * YmToPx
  const dy = (to.y - from.y) * YmToPx
  const angle = Math.atan2(dy, dx)
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  const length = Math.sqrt(dx * dx + dy * dy)
  let wl = defaultLineWidth
  let hl = defaultHeadLength
  if (lineWidth) {
    wl = lineWidth * YmToPx
  }
  if (headLength) {
    hl = headLength * YmToPx
  }

  const steps_1 = [
    { x: wl / 2 * sin, y: -wl / 2 * cos },
    { x: (length - hl) * cos, y: (length - hl) * sin },
    { x: (hl - wl) / 2 * sin, y: -(hl - wl) / 2 * cos },
  ]
  const steps_2 = [
    { x: -hl * sin, y: hl * cos },
    { x: (hl - wl) / 2 * sin, y: -(hl - wl) / 2 * cos },
    { x: -(length - hl) * cos, y: -(length - hl) * sin },
  ]
  let lastStep = { x: from.x * YmToPx, y: from.y * YmToPx }

  const arrow = new Graphics()

  arrow.moveTo(from.x * YmToPx, from.y * YmToPx)
  steps_1.forEach((step) => {
    const newX = lastStep.x + step.x
    const newY = lastStep.y + step.y
    arrow.lineTo(newX, newY)
    lastStep = { x: newX, y: newY }
  })
  arrow.lineTo(to.x * YmToPx, to.y * YmToPx)
  steps_2.forEach((step) => {
    const newX = lastStep.x + step.x
    const newY = lastStep.y + step.y
    arrow.lineTo(newX, newY)
    lastStep = { x: newX, y: newY }
  })
  arrow.lineTo(from.x * YmToPx, from.y * YmToPx)

  arrow.closePath()

  if (strokeColor) {
    arrow.stroke({ color: strokeColor, width: 2 })
  }
  arrow.fill(color)
  container.addChild(arrow)
}
