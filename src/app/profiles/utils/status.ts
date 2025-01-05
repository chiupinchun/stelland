import { Sprite } from "@/app/common/configs/sprites";

export const getExcellentStatus = (sprite: Sprite) => {
  const { status } = sprite
  return Object.entries(status)
    .filter(([_, value]) => value > 3)
    .sort(([_, v1], [__, v2]) => v2 - v1)
    .map(([key]) => key as keyof Sprite['status'])
}
