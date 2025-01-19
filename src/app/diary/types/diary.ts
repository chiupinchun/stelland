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
