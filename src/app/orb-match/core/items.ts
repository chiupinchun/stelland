export abstract class Item {
  abstract id: number
}

export class Potion extends Item {
  id = 1
}

export const items = [Potion]

export const getItemById = (id: number) => {
  return new [items[0], ...items][id]()
}
