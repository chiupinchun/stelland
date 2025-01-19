import { Sprite } from "@/app/common/configs/sprites"

export interface Diary {
  century: number
  year: number
  title: string
  content: string
  comments: {
    author: Sprite['key']
    content: string
  }[]
}

// 複製貼上用，之後刪掉
[
  ,
  {
    century: 2,
    year: 1,
    title: '',
    content: ``,
    comments: []
  }
]
