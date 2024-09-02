import { useRef } from "react"

export const useThrottle = <Fn extends (...args: any[]) => any>(fn: Fn, ms: number) => {
  const pending = useRef(false)
  return (...args: Parameters<Fn>) => {
    if (pending.current) { return }
    pending.current = true
    fn(...args)
    setTimeout(() => {
      pending.current = false
    }, ms)
  }
}