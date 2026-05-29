import { ROW_TYPES, type Row } from '../types'

export const rows: Row[] = [
  {
    type: ROW_TYPES.FOREST,
    trees: [
      { tileIndex: -5, height: 50 },
      { tileIndex: 5, height: 30 },
      { tileIndex: 7, height: 50 }
    ]
  },
  {
    type: ROW_TYPES.CAR,
    direction: false,
    speed: 188,
    vehicles: [
      { initialtileIndex: -4, color: 0xbdb638 },
      { initialtileIndex: -1, color: 0x78b14b },
      { initialtileIndex: 4, color: 0xa52523 }
    ]
  },
  {
    type: ROW_TYPES.FOREST,
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 }
    ]
  },
  {
    type: ROW_TYPES.TRUCK,
    direction: true,
    speed: 125,
    vehicles: [
      { initialtileIndex: -4, color: 0x78b14b },
      { initialtileIndex: 0, color: 0xbdb638 }
    ]
  }
]
