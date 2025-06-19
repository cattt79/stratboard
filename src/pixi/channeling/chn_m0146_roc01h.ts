import { DropShadowFilter } from 'pixi-filters'
import { Assets, Container, TilingSprite } from 'pixi.js'

import { getScale } from '../scale'

import tether_img from '/game/vfx/channeling/eff/chn_m0146_roc01h@3x.png?url'

// 实现类似 vfx/channeling/eff/chn_m0146_roc01h.avfx 的效果
export async function create_chn_m0146_roc01h(length: number) {
  const texture = await Assets.load(tether_img)

  const scale = 0.6
  const ratio = getScale(30) * scale

  const res = new Container()

  const tilingSprite = new TilingSprite({
    texture,
    width: texture.width / 40 * length / scale,
    height: texture.height,
  })
  tilingSprite.anchor.set(0.5, 0.5)
  tilingSprite.position.set(0, 0)
  tilingSprite.scale.set(ratio)

  const shadow = new TilingSprite({
    texture,
    width: texture.width / 40 * length / scale,
    height: texture.height,
  })
  shadow.anchor.set(0.5, 0.5)
  shadow.position.set(0, 0)
  shadow.scale.set(ratio)
  shadow.filters = [
    new DropShadowFilter({
      offset: { x: 0, y: 0 },
      alpha: 0.6,
      shadowOnly: true,
    }),
  ]
  res.addChild(shadow)
  res.addChild(tilingSprite)

  return res
}
