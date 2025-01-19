import { Reducer } from "react";
import { Sprite, sprites } from "../common/configs/sprites";
import { Diary } from "./types/diary";
import { getDiaryByAuthor, withCollapse } from "./utils/diary";

type Author = Sprite['key']

export interface InitialState {
  author: Author
  diaries: ReturnType<typeof withCollapse>
}

export const getInitialState = () => ({
  author: sprites[0].key,
  diaries: withCollapse(getDiaryByAuthor(sprites[0].key))
})

export const initialState: InitialState = getInitialState()

type ReducerAction = {
  type: 'set_author',
  payload: Author
} | {
  type: 'toggle_collapse',
  payload: Diary
}

export const reducer: Reducer<InitialState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'set_author': {
      const author = action.payload
      return {
        ...state,
        author,
        diaries: withCollapse(getDiaryByAuthor(author))
      }
    }
    case 'toggle_collapse': {
      const diary = action.payload
      const diaries = state.diaries.map(item => item === diary ? {
        ...item,
        collapsed: !item.collapsed
      } : item)
      return {
        ...state,
        diaries
      }
    }
  }
  return state
}
