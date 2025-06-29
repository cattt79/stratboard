import type { Application } from 'pixi.js'

import { Assets, Container, Graphics, Sprite } from 'pixi.js'

import type { AoEColors } from '@/pixi/aoe'

import { AoE, AOE_COLORS } from '@/pixi/aoe'
import { convertCoordinates } from '@/pixi/coordinates'
import { YmToPx } from '@/pixi/scale'

import inactive_fang from '/assets/07/m8s1/adds/gleaming_fang_1.png?url'
import active_fang from '/assets/07/m8s1/adds/gleaming_fang_4.png?url'

const centerToNorth = 17.54 * Math.cos(Math.PI / 5) + 8
const centerToSouth = 17.54 + 8
const radius = 17.54
const scale = 1.25
const YmToPxLarge = YmToPx * scale

const unitRad = (2 * Math.PI) / 5
// 浮游炮平移距离（m）
// 8m半径的台子，暂定平移4m
const fangAdjust = 4

function getDirectionSign(i: number, pattern: number): { x: number; y: number } {
  // const sign = pattern === 0 ? -1 : 1
  // return { x: sign, y: sign }
  return {
    x: (-1) ** pattern,
    y: (-1) ** (2 * i + 1) * (-1) ** pattern,
  } // 0 => 右，1 => 左
}

// 以南侧为基准，pattern 0是右边激活，pattern 1是左边激活
export async function addFangs(
  app: Application,
  options: {
    multiplefangs?: boolean
    activate?: boolean
    patterns?: number[]
    random?: boolean
    aoeColor?: Partial<AoEColors>
  },
) {
  const {
    multiplefangs = options.multiplefangs ?? false,
    activate = options.activate ?? false,
    patterns = options.patterns ?? Array.from({ length: 5 }, () => 0),
    random = options.random ?? false,
    aoeColor = options.aoeColor ?? AOE_COLORS.default,
  } = options
  const activeFangTexture = await Assets.load(active_fang)
  const inactiveFangTexture = await Assets.load(inactive_fang)
  const fangs = new Container()

  // apply random left/right, default as 0
  const patternArr: number[] = random
    ? Array.from({ length: 5 }, () => Math.random() < 0.5 ? 0 : 1)
    : patterns

  for (let i = 0; i < 5; i++) {
    // draw basic fangs group
    const radian = (i + 1) * unitRad
    const dir = getDirectionSign(i, patternArr[i])

    const fang = activate ? Sprite.from(activeFangTexture) : Sprite.from(inactiveFangTexture)
    fang.anchor.set(0.5, centerToNorth / (centerToNorth + centerToSouth))
    fang.scale.set(0.025)

    // rotation in degree, always facing center?
    // rotation first, then adjust position
    fang.rotation = radian - unitRad
    const p_adjust = convertCoordinates({ r: radius + 8, rad: radian + unitRad / 4 }, 'cartesian')
    fang.position.set(
      (p_adjust.x + dir.x * fangAdjust * Math.sin(radian + unitRad / 4)) * YmToPxLarge,
      (p_adjust.y + dir.y * fangAdjust * Math.cos(radian + unitRad / 4)) * YmToPxLarge,
    )
    fangs.addChild(fang)

    // another fangs group
    if (multiplefangs) {
      const fang = Sprite.from(inactiveFangTexture)
      fang.anchor.set(0.5, centerToNorth / (centerToNorth + centerToSouth))
      fang.scale.set(0.025)

      // rotation in degree, always facing center?
      // rotation first, then adjust position
      fang.rotation = radian - unitRad
      const p_adjust = convertCoordinates({ r: radius + 8, rad: radian + unitRad / 4 }, 'cartesian')
      fang.position.set(
        (p_adjust.x - dir.x * fangAdjust * Math.sin(radian + unitRad / 4)) * YmToPxLarge,
        (p_adjust.y - dir.y * fangAdjust * Math.cos(radian + unitRad / 4)) * YmToPxLarge,
      )
      fangs.addChild(fang)
    }
  }

  if (activate) {
    // create position of each rect
    const rects = []
    for (let i = 0; i < 5; i++) {
      const p = {
        x: -radius * scale * Math.sin(i * unitRad),
        y: radius * scale * Math.cos(i * unitRad),
      }
      rects.push({
        position: p,
        rotation: Math.atan2(p.y - 0, p.x - 0) * (180 / Math.PI) - 90,
        options: { colors: aoeColor } })
    }

    const aoe = AoE.createRects(app, rects, (fangAdjust + 0.4) * 2 * 1.25, 18 * 1.25)
    aoe.children.forEach((c, i) => {
      const prCoor = convertCoordinates(c, 'polar-radian')
      const dir = getDirectionSign(i, patternArr[i])
      c.position.set(
        c.position.x + dir.x * (fangAdjust + 0.4) * Math.sin(prCoor.rad) * YmToPxLarge,
        c.position.y + dir.y * (fangAdjust + 0.4) * Math.cos(prCoor.rad) * YmToPxLarge,
      )
    })

    const mask = new Graphics()
    for (let i = 0; i < 5; i++) {
      const r = i * unitRad
      mask.circle(-17.54 * YmToPxLarge * Math.sin(r), 17.54 * YmToPxLarge * Math.cos(r), 8 * YmToPxLarge)
    }
    mask.fill({ color: 'white' })
    aoe.mask = mask
    aoe.addChild(mask)
    fangs.addChild(aoe)
  }

  return fangs
}
