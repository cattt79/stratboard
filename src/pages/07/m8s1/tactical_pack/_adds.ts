import { Assets, Sprite } from 'pixi.js'

import aether_of_stone_1 from '/assets/07/m8s1/adds/font_of_earth_aether_1@3x.png?url'
import aether_of_stone_2 from '/assets/07/m8s1/adds/font_of_earth_aether_2@3x.png?url'
import aether_of_stone_3 from '/assets/07/m8s1/adds/font_of_earth_aether_3@3x.png?url'
import aether_of_wind_1 from '/assets/07/m8s1/adds/font_of_wind_aether_1@3x.png?url'
import aether_of_wind_2 from '/assets/07/m8s1/adds/font_of_wind_aether_2@3x.png?url'
import aether_of_wind_3 from '/assets/07/m8s1/adds/font_of_wind_aether_3@3x.png?url'
import wolf_of_stone from '/assets/07/m8s1/adds/wolf_of_stone_1@3x.png?url'
import wolf_of_wind from '/assets/07/m8s1/adds/wolf_of_wind_1@3x.png?url'

export async function create_wolf(type: 'wind' | 'stone') {
  const img = type === 'wind' ? wolf_of_wind : wolf_of_stone
  const texture = await Assets.load(img)
  const wolf = Sprite.from(texture)
  wolf.anchor.set(0.5, 0.64)
  return wolf
}

export async function create_aether(type: 'wind' | 'stone', num: '1' | '2' | '3') {
  const img = {
    wind: {
      1: aether_of_wind_1,
      2: aether_of_wind_2,
      3: aether_of_wind_3,
    },
    stone: {
      1: aether_of_stone_1,
      2: aether_of_stone_2,
      3: aether_of_stone_3,
    },
  }[type][num]
  const texture = await Assets.load(img)
  const aether = Sprite.from(texture)
  aether.anchor.set(0.5, 0.64)
  return aether
}
