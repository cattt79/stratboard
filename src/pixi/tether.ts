import type { Texture } from 'pixi.js'

import { Sprite } from 'pixi.js'

import { convertCoordinates } from '@/pixi/coordinates'
import { YmToPx } from '@/pixi/scale'

import type { Coordinates } from './coordinates'

export function create_tether(start: Coordinates, end: Coordinates, tether: Texture) {
  const p1 = convertCoordinates(start, 'cartesian')
  const p2 = convertCoordinates(end, 'cartesian')
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const mid_x = (p2.x + p1.x) / 2
  const mid_y = (p2.y + p1.y) / 2
  const len = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx)
  const chn = new Sprite(tether)
  chn.anchor.set(0.5, 0.5)
  chn.position.set(mid_x * YmToPx, mid_y * YmToPx)
  chn.rotation = angle + Math.PI
  chn.width = len * YmToPx
  chn.height = 4 * YmToPx
  return chn
}
