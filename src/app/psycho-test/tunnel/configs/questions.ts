import { Sprite } from "@/app/common/configs/sprites"

class Option {
  constructor(
    public readonly text: string,
    public readonly sprites: Sprite['key'][]
  ) { }
}

export interface Question {
  text: string
  options: Option[]
}

export const questions: Question[] = [
  {
    text: '你比較偏好哪種休閒活動？',
    options: [
      new Option('運動', ['fish', 'dog', 'chikun']),
      new Option('電玩', ['cat', 'dog', 'snake']),
      new Option('學習', ['fish', 'snake']),
      new Option('音樂', ['chikun']),
    ]
  }
].sort(() => Math.random() > 0.5 ? 1 : -1)
