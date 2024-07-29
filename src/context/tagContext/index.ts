'use client'

import { createContext, useContext } from 'react'

export type LabelItem = {
  id: string
  name: string
}

export type TagContext = {
  allTags: LabelItem[]
  selectedTag: LabelItem
  setSelectedTag: (tag: LabelItem) => void
}

export const initialTagContext: TagContext = {
  allTags: [],
  selectedTag: { id: '', name: '' },
  setSelectedTag: () => console.log('setSelectedTag is not defined')
}

export const TagContext = createContext<TagContext>(initialTagContext)

export const useTagContext = () => useContext(TagContext)
