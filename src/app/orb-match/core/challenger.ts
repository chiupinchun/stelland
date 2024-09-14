import { UserInfoResponse } from "@/api/module/orb-match"
import { getBlessingById } from "./blessings"
import { Weapon } from "./weapons"

export abstract class Character {
  abstract maxHp: number
  abstract hp: number
  sheild = 0
  abstract atk: number
  abstract def: number
  increaseDmg = 0
  critical = 0
  criticalDmg = 0
  fireDmg = 0
  waterDmg = 0
  groundDmg = 0
  poisonDmg = 0
  physicDmg = 0
  fireResistance = 0
  waterResistance = 0
  groundResistance = 0
  poisonResistance = 0
  physicResistance = 0
  maxResistance = 50
  healRate = 0
}

export class Challenger extends Character {
  maxHp = 50
  hp = 50
  atk = 10
  def = 10

  constructor(
    weapon: Weapon | null,
    blessings: UserInfoResponse['blessings']
  ) {
    super()
    blessings.forEach(({ id, count }) => {
      const blessing = getBlessingById(id)
      for (let i = 0; i < count; i++) {
        blessing.effect(this)
      }
    })
    if (weapon) {
      this.atk += weapon.baseAtk
      this.def += weapon.baseDef
      weapon.effect(this)
    }
  }

  receiveHeal(value: number) {
    value = Math.floor(value * (1 + this.healRate / 100))
    this.hp = Math.min(this.hp + value, this.maxHp)
  }

  receiveSheild(value: number) {
    this.sheild = Math.max(this.sheild, value)
  }
}