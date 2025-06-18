import { Graphics } from 'pixi.js'

import { YmToPx } from '@/pixi/scale'

export function create_stone_mask(inverse: boolean = false) {
  if (inverse) {
    return new Graphics()
      .circle(0, 0, 15 * YmToPx)
      .fill({ color: 'white' })
      .circle(-7 * YmToPx, 0, 5 * YmToPx)
      .cut()
      .circle(7 * YmToPx, 0, 5 * YmToPx)
      .cut()
  }
  return new Graphics()
    .circle(-7 * YmToPx, 0, 5 * YmToPx)
    .circle(7 * YmToPx, 0, 5 * YmToPx)
    .fill({ color: 'white' })
}
