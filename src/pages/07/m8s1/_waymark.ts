import type { WaymarkData } from '@/pixi/waymark'

export const waymarkData: WaymarkData = {
  A: { X: 0, Z: -8.5 },
  B: { X: 8.5, Z: 0 },
  C: { X: 0, Z: 8.5 },
  D: { X: -8.5, Z: 0 },
  One: { X: -6, Z: -6 },
  Two: { X: 6, Z: -6 },
  Three: { X: 6, Z: 6 },
  Four: { X: -6, Z: 6 },
}

export const waymarkDataABCD: WaymarkData = {
  A: { X: 0, Z: -8.5 },
  B: { X: 8.5, Z: 0 },
  C: { X: 0, Z: 8.5 },
  D: { X: -8.5, Z: 0 },
}

export const waymarkDataAC: WaymarkData = {
  A: { X: 0, Z: -8.5 },
  C: { X: 0, Z: 8.5 },
}

export const waymarkDataBD: WaymarkData = {
  B: { X: 8.5, Z: 0 },
  D: { X: -8.5, Z: 0 },
}

export const waymarkData1234: WaymarkData = {
  One: { X: -6, Z: -6 },
  Two: { X: 6, Z: -6 },
  Three: { X: 6, Z: 6 },
  Four: { X: -6, Z: 6 },
}
