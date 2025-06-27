import { Graphics } from 'pixi.js'

export async function drawSafeZone1(x: number, y: number) {
  const polygon = new Graphics()
  polygon.poly([-122, -92, -153, -62, -144, -53, -100, -53, -91, -62])
  polygon.position.set(x, y)
  polygon.fill({ color: '8dcc85', alpha: 0.6 })
  polygon.stroke({ width: 4, color: '8dcc85' })
  return polygon
}
