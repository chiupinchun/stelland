export const getRandomIndex = (seed: number, range: number) => {
  const day = new Date().getDate()
  const randomNumberByDay = Math.abs(Math.sin(seed + day) * 0.9)
  return Math.floor(randomNumberByDay * range)
}

export const getRandomItemByDay = <T = unknown>(
  seed: number, from: T[] | readonly T[]
) => {
  const index = getRandomIndex(seed, from.length)
  return from[index]
}
