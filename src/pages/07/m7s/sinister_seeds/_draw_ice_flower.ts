import type { Application, Container } from 'pixi.js'

import { AoE, AOE_COLORS } from '@/pixi/aoe'
import { YmToPx } from '@/pixi/scale.ts'

export function drawIceFlower(
  app: Application,
  container: Container<any>,
  center: { x: number; y: number },
) {
  const color = AOE_COLORS.tailwind.orange
  const rect1 = AoE.createRect(100, 4, { colors: color }).toSprite(app)
  const rect2 = AoE.createRect(100, 4, { colors: color }).toSprite(app)
  const rect3 = AoE.createRect(100, 4, { colors: color }).toSprite(app)
  const rect4 = AoE.createRect(100, 4, { colors: color }).toSprite(app)

  const rects = [rect1, rect2, rect3, rect4]

  rects.forEach((rect, i) => {
    // rect.anchor.set(0.5, 0.5)
    rect.position.set(center.x * YmToPx, center.y * YmToPx)
    // rect.width = 30 * YmToPx
    // rect.height = 300 * YmToPx
    rect.rotation = i * Math.PI / 4
  })

  container.addChild(rect1)
  container.addChild(rect2)
  container.addChild(rect3)
  container.addChild(rect4)
}
