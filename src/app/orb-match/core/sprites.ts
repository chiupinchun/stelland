import { sprites } from "@/app/common/configs/sprites";
import { Character } from "./challenger";

export class Fish extends Character {
  name = '鰭之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export class Cat extends Character {
  name = '無形之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export class Dog extends Character {
  name = '牙之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export class Snake extends Character {
  name = '環之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export class Chikun extends Character {
  name = '冠之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export class PrairieDog extends Character {
  name = '爪之星靈'
  maxHp: number;
  hp: number;
  atk: number;
  def: number;

  constructor(public readonly level: number) {
    super()

    this.maxHp = this.hp = 1000 + 50 * level
    this.atk = level
    this.def = level
  }
}

export const getSpriteByKey = (
  key: typeof sprites[number]['key'],
  level: number
) => {
  const spriteMap = {
    fish: Fish,
    cat: Cat,
    dog: Dog,
    snake: Snake,
    chikun: Chikun,
    'prairie-dog': PrairieDog
  } as const

  return new spriteMap[key](level)
}

export type Sprite = ReturnType<typeof getSpriteByKey>
