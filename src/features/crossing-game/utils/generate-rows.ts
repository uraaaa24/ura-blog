import * as THREE from 'three'
import { maxtileIndex, mintileIndex } from '../constants'
import { type Row, ROW_TYPES, type RowType } from '../types'

export const generateRows = (amount: number): Row[] => {
  const rows: Row[] = []
  for (let i = 0; i < amount; i++) {
    const rowData = generateRow()
    rows.push(rowData)
  }
  return rows
}

const generateRow = (): Row => {
  const type: RowType = randomElement(Object.values(ROW_TYPES))
  switch (type) {
    case ROW_TYPES.FOREST:
      return generateForestMetaData()
    case ROW_TYPES.CAR:
      return generateCarLaneMetaData()
    case ROW_TYPES.TRUCK:
      return generateTruckLaneMetaData()
  }
}

const randomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

const generateForestMetaData = (): Extract<Row, { type: typeof ROW_TYPES.FOREST }> => {
  const occupiedTiles = new Set<number>()
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex: number
    do {
      tileIndex = THREE.MathUtils.randInt(mintileIndex, maxtileIndex)
    } while (occupiedTiles.has(tileIndex))
    occupiedTiles.add(tileIndex)

    const height = randomElement([20, 45, 60])

    return { tileIndex, height }
  })

  return { type: ROW_TYPES.FOREST, trees }
}

const generateCarLaneMetaData = (): Extract<Row, { type: typeof ROW_TYPES.CAR }> => {
  const direction = randomElement([true, false])
  const speed = randomElement([125, 156, 188])

  const occupiedTiles = new Set<number>()

  const vehicles = Array.from({ length: 3 }, () => {
    let initialtileIndex: number
    do {
      initialtileIndex = THREE.MathUtils.randInt(mintileIndex, maxtileIndex)
    } while (occupiedTiles.has(initialtileIndex))
    occupiedTiles.add(initialtileIndex - 1)
    occupiedTiles.add(initialtileIndex)
    occupiedTiles.add(initialtileIndex + 1)

    const color: THREE.ColorRepresentation = randomElement([0xbdb638, 0x78b14b, 0xa52523])

    return { initialtileIndex, color }
  })

  return { type: ROW_TYPES.CAR, direction, speed, vehicles }
}

const generateTruckLaneMetaData = (): Extract<Row, { type: typeof ROW_TYPES.TRUCK }> => {
  const direction = randomElement([true, false])
  const speed = randomElement([125, 156, 188])

  const occupiedTiles = new Set<number>()

  const vehicles = Array.from({ length: 2 }, () => {
    let initialtileIndex: number
    do {
      initialtileIndex = THREE.MathUtils.randInt(mintileIndex, maxtileIndex)
    } while (occupiedTiles.has(initialtileIndex))
    occupiedTiles.add(initialtileIndex - 2)
    occupiedTiles.add(initialtileIndex - 1)
    occupiedTiles.add(initialtileIndex)
    occupiedTiles.add(initialtileIndex + 1)
    occupiedTiles.add(initialtileIndex + 2)

    const color: THREE.ColorRepresentation = randomElement([0xbdb638, 0x78b14b, 0xa52523])

    return { initialtileIndex, color }
  })

  return { type: ROW_TYPES.TRUCK, direction, speed, vehicles }
}
