import type { Application } from 'pixi.js'

import { Assets, Container, Graphics, Sprite } from 'pixi.js'

import { AoE } from '@/pixi/aoe'
import { convertCoordinates } from '@/pixi/coordinates'
import { YmToPx } from '@/pixi/scale'

import inactive_fang from '/assets/07/m8s1/adds/gleaming_fang_1.png?url'
import active_fang from '/assets/07/m8s1/adds/gleaming_fang_4.png?url'

const centerToNorth = 17.54 * Math.cos(Math.PI / 5) + 8
const centerToSouth = 17.54 + 8
const radius = 17.54
const YmToPxLarge = YmToPx * 1.25

// 浮游炮平移距离（m）
// 8m半径的台子，暂定平移4m
const fangAdjust = 4

// 以南侧为基准，pattern 0是右边激活，pattern 1是左边激活
export async function addFangs(app: Application, multiplefangs = false, activate = false, pattern = 0) {
  const activeFangTexture = await Assets.load(active_fang)
  const inactiveFangTexture = await Assets.load(inactive_fang)
  const fangs = new Container()

  for (let i = 0; i < 5; i++) {
    const radian = (2 * i * Math.PI) / 5

    const fang = activate ? Sprite.from(activeFangTexture) : Sprite.from(inactiveFangTexture)
    fang.anchor.set(0.5, centerToNorth / (centerToNorth + centerToSouth))
    fang.scale.set(0.025)

    // rotation in degree, always facing center?
    // rotation first, then adjust position
    fang.angle = (radian + 0.32) * (180 / Math.PI) - 90
    const p_adjust = convertCoordinates({ r: radius + 8, rad: radian + 0.32 + (-1) ** i * 0.0 }, 'cartesian')
    const angle = Math.atan2(p_adjust.y - 0, p_adjust.x - 0)
    fang.position.set((p_adjust.x - (-1) ** i * (-1) ** pattern * fangAdjust * Math.sin(angle)) * YmToPxLarge, (p_adjust.y
      - (-1) ** (i + 1) * (-1) ** pattern * fangAdjust * Math.cos(angle)) * YmToPxLarge)
    fangs.addChild(fang)

    if (multiplefangs) {
      const fang = Sprite.from(inactiveFangTexture)
      const p = convertCoordinates({ r: radius + 8, rad: radian + 0.32 }, 'cartesian')
      fang.anchor.set(0.5, centerToNorth / (centerToNorth + centerToSouth))
      fang.scale.set(0.025)

      // rotation in degree, always facing center?
      // rotation first, then adjust position
      fang.angle = Math.atan2(p.y - 0, p.x - 0) * (180 / Math.PI) - 90
      const p_adjust = convertCoordinates({ r: radius + 8, rad: radian + 0.32 + (-1) ** i * 0.0 }, 'cartesian')
      const angle = Math.atan2(p_adjust.y - 0, p_adjust.x - 0)
      fang.position.set((p_adjust.x + (-1) ** i * (-1) ** pattern * fangAdjust * Math.sin(angle)) * YmToPxLarge, (p_adjust.y
        + (-1) ** (i + 1) * (-1) ** pattern * fangAdjust * Math.cos(angle)) * YmToPxLarge)
      fangs.addChild(fang)
    }
  }

  if (activate) {
    // create position of each rect
    const rects = []
    for (let i = 0; i < 5; i++) {
      const p = {
        x: -17.54 * 1.25 * Math.sin((2 * i * Math.PI) / 5),
        y: 17.54 * 1.25 * Math.cos((2 * i * Math.PI) / 5),
      }
      rects.push({ position: p, rotation: Math.atan2(p.y - 0, p.x - 0) * (180 / Math.PI) - 90 })
    }

    const aoe = AoE.createRects(app, rects, 8 * 1.25, 16 * 1.25)
    aoe.children.forEach((c, i) => {
      const angle = Math.atan2(c.position.y - 0, c.position.x - 0)
      // 算不明白的第五个，第五个会跟其他四个反着
      // 很邪门，一样的计算方式浮游炮平移是对的，但是在aoe上最后一个就是错的
      // 大概写的有点丑陋（能跑
      c.position.set(
        c.position.x + (i === 4 ? -1 : (-1) ** i * (-1) ** pattern) * 4 * Math.sin(angle) * YmToPxLarge,
        c.position.y + (i === 4 ? 1 : (-1) ** (i + 1) * (-1) ** pattern) * 4 * Math.cos(angle) * YmToPxLarge,
      )
    })

    const mask = new Graphics()
    for (let i = 0; i < 5; i++) {
      const r = (2 * i * Math.PI) / 5
      mask.circle(-17.54 * YmToPxLarge * Math.sin(r), 17.54 * YmToPxLarge * Math.cos(r), 8 * YmToPxLarge)
    }
    mask.fill({ color: 'white' })
    aoe.mask = mask
    aoe.addChild(mask)
    fangs.addChild(aoe)
  }

  return fangs
}
