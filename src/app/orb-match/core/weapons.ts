import { Challenger } from "./challenger"

export abstract class Weapon {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void

  abstract baseAtk: number
  abstract baseDef: number
}

export class Hammer extends Weapon {
  id = 1
  name = '槌子'
  description = '提升5點基礎攻擊力，無特殊效果。'
  effect = () => { }
  baseAtk = 5
  baseDef = 0
}

export class SuperNova extends Weapon {
  id = 2
  name = '超新星'
  description = '提升25點基礎攻擊力，攻擊造成額外25%的傷害。'
  effect = (challenger: Challenger) => {
    challenger.increaseDmg += 25
  }
  baseAtk = 25
  baseDef = 0
}

export class EnergySword extends Weapon {
  id = 3
  name = '能量劍'
  description = '提升10點基礎攻擊力，提升10%火焰屬性傷害。'
  effect = (challenger: Challenger) => {
    challenger.fireDmg += 10
  }
  baseAtk = 10
  baseDef = 0
}

export class Microphone extends Weapon {
  id = 4
  name = '麥克風'
  description: string = '提升10%回復率，無基礎攻擊力。'
  effect: (challenger: Challenger) => void = (challenger) => {
    challenger.healRate += 10
  }
  baseAtk: number = 0
  baseDef = 0
}

export class RockArmor extends Weapon {
  id = 5
  name = '堅岩之甲'
  description: string = '提升10點基礎防禦力，提升10%大地屬性傷害'
  effect = (challenger: Challenger) => {
    challenger.groundDmg += 10
  }
  baseAtk: number = 0
  baseDef = 10
}

export class Spear extends Weapon {
  id = 6
  name = '衝鋒長槍'
  description: string = '提升10點基礎攻擊力，提升10%物理屬性傷害'
  effect = (challenger: Challenger) => {
    challenger.physicDmg += 10
  }
  baseAtk = 10
  baseDef = 0
}

export class ScoopingNet extends Weapon {
  id = 7
  name = '小撈網'
  description: string = '沒有基礎攻擊力，提升15%水屬性傷害。'
  effect: (challenger: Challenger) => void = (challenger) => {
    challenger.waterDmg += 15
  }
  baseAtk: number = 0
  baseDef: number = 0
}

export class ancientSpriteWand extends Weapon {
  id = 8
  name = '古神之杖'
  description: string = '沒有基礎攻擊力，攻擊必定暴擊，暴擊傷害提升為50%'
  effect = (challenger: Challenger) => {
    challenger.critical = 99999
    challenger.criticalDmg = 50
  }
  baseAtk: number = 0
  baseDef: number = 0
}

export const weapons = [
  Hammer, SuperNova, EnergySword, Microphone, RockArmor, Spear, ScoopingNet,
  ancientSpriteWand
]

export const getWeaponById = (id: number) => {
  return new [weapons[0], ...weapons][id]()
}
