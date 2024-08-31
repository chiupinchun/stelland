export abstract class Blessing {
  abstract id: number
}

export class AtkUp extends Blessing {
  id = 1
}

export const blessings = [AtkUp]

export const getBlessingById = (id: number) => {
  return new [blessings[0], ...blessings][id]()
}
