import { useRef } from "react"

export const useDebounce = <Fn extends (...args: any[]) => any>(fn: Fn, ms: number) => {
  const times = useRef(0)
  return (...args: Parameters<Fn>) => {
    const currentTime = ++times.current

    setTimeout(() => {
      if (currentTime === times.current) {
        fn(...args)
      }
    }, ms)
  }
}