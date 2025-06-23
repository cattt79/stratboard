import { DropShadowFilter } from 'pixi-filters'
import { Assets, Container, Sprite } from 'pixi.js'

import boss_moonlight from '/assets/07/m8s1/adds/boss_moonlight@4x.png?url'
import boss_img from '/assets/07/m8s1/adds/boss@4x.png?url'

export async function createBoss() {
  const texture = await Assets.load(boss_img)
  const container = new Container()
  const boss = Sprite.from(texture)
  boss.anchor.set(0.55, 0.5)
  const shadow = Sprite.from(texture)
  shadow.anchor.set(0.55, 0.5)
  shadow.filters = [
    new DropShadowFilter({
      offset: { x: 0, y: 0 },
      alpha: 0.5,
      shadowOnly: true,
    }),
  ]
  container.addChild(shadow)
  container.addChild(boss)
  return container
}

export async function createBossMoonlight(inverse: boolean = false) {
  const texture = await Assets.load(boss_moonlight)
  const container = new Container()
  const boss = Sprite.from(texture)
  boss.anchor.set(0.675, 0.675)
  if (inverse) {
    boss.scale.set(-1, 1)
  }
  const shadow = Sprite.from(texture)
  shadow.anchor.set(0.675, 0.675)
  shadow.filters = [
    new DropShadowFilter({
      offset: { x: 0, y: 0 },
      alpha: 1,
      shadowOnly: true,
    }),
  ]
  if (inverse) {
    shadow.scale.set(-1, 1)
  }
  container.addChild(shadow)
  container.addChild(boss)
  return container
}
