import { initialTagContext, LabelItem, TagContext } from '@/context/tagContext'

export type TagReducerState = {
  tags: TagContext['allTags']
}

export const initialTagReducerState: TagReducerState = {
  tags: initialTagContext['allTags']
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
    default:
      return state
  }
}
