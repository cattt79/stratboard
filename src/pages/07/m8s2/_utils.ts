export function platform_to_coord(platform: number, offset: { horizontal: number; vertical: number } = { horizontal: 0, vertical: 0 }, scale: number = 1) {
  const radian = (2 * platform * Math.PI) / 5
  const coord = { x: (-17.54 * Math.sin(radian) + offset.horizontal) * scale,
    y: (17.54 * Math.cos(radian) + offset.vertical) * scale }
  return coord
}
