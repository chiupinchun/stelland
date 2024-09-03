import { Challenger } from "./challenger"

export abstract class Blessing {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void
}

export class AtkUp extends Blessing {
  id = 1
  name = '攻擊強化'
  description = '提升攻擊5點。'
  effect = (challenger: Challenger) => {
    challenger.atk += 5
  }
}

export class DefUp extends Blessing {
  id = 2
  name = '防禦強化'
  description = '提升防禦5點。'
  effect = (challenger: Challenger) => {
    challenger.def += 5
  }
}

export class PoisonMaster extends Blessing {
  id = 3
  name = '毒專精'
  description = '提升毒屬性傷害5%及毒屬性抗性5%。'
  effect = (challenger: Challenger) => {
    challenger.poisonDmg += 5
    challenger.poisonResistance += 5
  }
}

export class FireMaster extends Blessing {
  id = 4
  name = '火專精'
  description: string = '提升火屬性傷害5%及火屬性抗性5%。'
  effect = (challenger: Challenger) => {
    challenger.fireDmg += 5
    challenger.fireResistance += 5
  }
}

export class PhysicMaster extends Blessing {
  id = 5
  name = '物理專精'
  description: string = '提升物理屬性傷害5%及物理屬性抗性5%。'
  effect = (challenger: Challenger) => {
    challenger.physicDmg += 5
    challenger.physicResistance += 5
  }
}

export class GroundMaster extends Blessing {
  id = 6
  name = '大地專精'
  description: string = '提升大地屬性傷害5%及大地屬性抗性5%。'
  effect = (challenger: Challenger) => {
    challenger.groundDmg += 5
    challenger.groundResistance += 5
  }
}

export class WaterMaster extends Blessing {
  id = 7
  name = '水專精'
  description: string = '提升水屬性傷害5%及水屬性抗性5%。'
  effect = (challenger: Challenger) => {
    challenger.waterDmg += 5
    challenger.waterResistance += 5
  }
}

export class HealMaster extends Blessing {
  id = 8
  name = '治癒專精'
  description: string = '提升回復率5%。'
  effect: (challenger: Challenger) => void = (challenger) => {
    challenger.healRate += 5
  }
}

export class CriticalMaster extends Blessing {
  id = 9
  name = '暴擊專精'
  description = '提升暴擊率5%及暴擊傷害2%。'
  effect = (challenger: Challenger) => {
    challenger.critical += 5
    challenger.criticalDmg += 2
  }
}

export class HealthMaster extends Blessing {
  id = 10
  name = '生命專精'
  description = '提升5點最大生命'
  effect = (challenger: Challenger) => {
    challenger.maxHp += 5
    challenger.hp += 5
  }
}

export const blessings = [
  AtkUp, DefUp, PoisonMaster, FireMaster, PhysicMaster, GroundMaster, WaterMaster,
  HealMaster, CriticalMaster, HealthMaster
]

export const getBlessingById = (id: number) => {
  return new [blessings[0], ...blessings][id]()
}
