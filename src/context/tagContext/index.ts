'use client'

import { createContext, useContext } from 'react'

export type LabelItem = {
  id: string
  name: string
}

export type TagContext = {
  allTags: LabelItem[]
}

export const initialTagContext: TagContext = {
  allTags: []
}

export const TagContext = createContext<TagContext>(initialTagContext)

export const useTagContext = () => useContext(TagContext)
