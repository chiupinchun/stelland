import { getUserInfo } from "@/api/module/orb-match";
import { Blessing, getBlessingById } from "./blessings";
import { getItemById, Item } from "./items";
import { getWeaponById, Weapon } from "./weapons";

export interface User {
  weapon: Weapon | null
  blessings: Blessing[]
  items: Item[]
}

export const userToUserInfo = (user: User): ReturnType<typeof getUserInfo> => {
  return {
    weapon: user.weapon ? user.weapon.id : null,
    blessings: user.blessings ? user.blessings.map(blessing => blessing.id) : [],
    items: []
  }
}

export const userInfoToUser = (userInfo: ReturnType<typeof getUserInfo>): User => {
  return {
    weapon: typeof userInfo.weapon === 'number' ? getWeaponById(userInfo.weapon) : null,
    blessings: userInfo.blessings ? userInfo.blessings.map(id => getBlessingById(id)) : [],
    items: userInfo.items ? userInfo.items.map(id => getItemById(id)) : []
  }
}
