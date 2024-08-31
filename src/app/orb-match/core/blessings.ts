import { Challenger } from "./user"

export abstract class Blessing {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void
}

export class AtkUp extends Blessing {
  id = 1
  name = ''
  description = ''
  effect = () => { }
}

export const blessings = [AtkUp]

export const getBlessingById = (id: number) => {
  return new [blessings[0], ...blessings][id]()
}
