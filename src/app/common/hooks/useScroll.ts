import { useEffect, useState } from "react"

export const useScroll = () => {
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }
    onScroll()

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollX, scrollY }
}