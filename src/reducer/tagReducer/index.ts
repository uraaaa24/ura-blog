import { initialTagContext, LabelItem, TagContext } from '@/context/tagContext'

export type TagReducerState = {
  tags: TagContext['allTags']
  selectedTag: TagContext['selectedTag']
}

export const initialTagReducerState: TagReducerState = {
  tags: initialTagContext['allTags'],
  selectedTag: initialTagContext['selectedTag']
}

export type TagAction =
  | { type: 'SET_ALL_TAGS'; tags: TagContext['allTags'] }
  | {
      type: 'SET_SELECTED_TAG'
      payload: LabelItem
    }
  | { type: 'CLEAR_SELECTED_TAG' }

export const tagReducer = (state: TagReducerState, action: TagAction): TagReducerState => {
  switch (action.type) {
    case 'SET_ALL_TAGS':
      return {
        ...state,
        tags: action.tags
      }
    case 'SET_SELECTED_TAG':
      return {
        ...state,
        selectedTag: {
          id: action.payload.id,
          name: action.payload.name
        }
      }
    case 'CLEAR_SELECTED_TAG':
      return {
        ...state,
        selectedTag: initialTagContext.selectedTag
      }
    default:
      return state
  }
}
