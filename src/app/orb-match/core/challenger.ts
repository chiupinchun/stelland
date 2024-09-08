import { Blessing } from "./blessings"
import { Weapon } from "./weapons"

export class Challenger {
  maxHp = 50
  hp = 50
  sheild = 0
  atk = 10
  def = 10
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

  constructor(
    weapon: Weapon | null,
    blessings: Blessing[]
  ) {
    blessings.forEach(blessing => blessing.effect(this))
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