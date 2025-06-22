import { DropShadowFilter } from 'pixi-filters'
import { Assets, Container, Sprite } from 'pixi.js'

import { YmToPx } from '@/pixi/scale'

import gleaming_fang_1 from '/assets/07/m8s1/adds/gleaming_fang_1@4x.png?url'
import gleaming_fang_2 from '/assets/07/m8s1/adds/gleaming_fang_2@4x.png?url'

async function createSingleFnag(type: '1' | '2') {
  const texture = await Assets.load(type === '1' ? gleaming_fang_1 : gleaming_fang_2)

  const container = new Container()
  const fang = Sprite.from(texture)
  fang.anchor.set(0.5, 1)
  const shadow = Sprite.from(texture)
  shadow.anchor.set(0.5, 1)
  shadow.filters = [
    new DropShadowFilter({
      offset: { x: 0, y: 0 },
      alpha: 0.75,
      shadowOnly: true,
    }),
  ]
  container.addChild(shadow)
  container.addChild(fang)
  return container
}

export async function createFang(type: '1' | '2') {
  const container = new Container()

  const fang1 = await createSingleFnag(type)
  fang1.position.set(0, 0.25 * YmToPx)

  const fang2 = await createSingleFnag(type)
  fang2.position.set(0, -0.25 * YmToPx)
  fang2.rotation = Math.PI

  container.addChild(fang1)
  container.addChild(fang2)

  return container
}
