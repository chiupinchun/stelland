import { useEffect, useState } from "react"

export const useFetch = <T = unknown>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    const res = await fetcher()
    setData(res)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, deps)

  return { data, loading, refresh }
}