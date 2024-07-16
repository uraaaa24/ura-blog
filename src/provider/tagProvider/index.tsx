'use client'

import { usePathname } from 'next/navigation'
import { useReducer } from 'react'

import { LabelItem, TagContext } from '@/context/tagContext'
import { initialTagReducerState, tagReducer } from '@/reducer/tagReducer'

type TagProviderProps = {
  allTags: LabelItem[]
  children: React.ReactNode
}

export const TagProvider = (props: TagProviderProps) => {
  const [state, dispatch] = useReducer(tagReducer, initialTagReducerState)

  const path = usePathname()
  const currentTag = () => path.split('/').pop()
  const selectedTag = props.allTags.find((tag) => tag.id === currentTag())

  const contextValue: TagContext = {
    allTags: props.allTags,
    selectedTag: selectedTag ?? state.selectedTag,
    setSelectedTag: (tag) => {
      dispatch({ type: 'SET_SELECTED_TAG', payload: tag })
    }
  }

  return <TagContext.Provider value={contextValue}>{props.children}</TagContext.Provider>
}
