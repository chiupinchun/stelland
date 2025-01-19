import { Sprite } from "@/app/common/configs/sprites";
import { Diary } from "../types/diary";
import { catDiary } from "../configs/cat";
import { chikunDiary } from "../configs/chikun";
import { dogDiary } from "../configs/dog";
import { fishDiary } from "../configs/fish";
import { prairieDogDiary } from "../configs/prairie-dog";
import { snakeDiary } from "../configs/snake";

export const withCollapse = (diaries: Diary[], initailState: boolean = true) => {
  return diaries.map(diary => ({
    ...diary,
    collapsed: initailState
  }))
}

export const getDiaryByAuthor = (author: Sprite['key']) => {
  switch (author) {
    case 'cat':
      return catDiary
    case 'chikun':
      return chikunDiary
    case 'dog':
      return dogDiary
    case 'fish':
      return fishDiary
    case 'prairie-dog':
      return prairieDogDiary
    case 'snake':
      return snakeDiary
  }
}
