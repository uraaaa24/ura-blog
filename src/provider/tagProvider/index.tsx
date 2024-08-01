'use client'

import { LabelItem, TagContext } from '@/context/tagContext'

type TagProviderProps = {
  allTags: LabelItem[]
  children: React.ReactNode
}

export const TagProvider = (props: TagProviderProps) => {
  const contextValue: TagContext = {
    allTags: props.allTags
  }

  return <TagContext.Provider value={contextValue}>{props.children}</TagContext.Provider>
}
