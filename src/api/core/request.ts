/**
 * Maybe it would change to real api someday
 * @param url localStorage key mock db table
 * @param requestOption will be passed to localStorage.setItem
 * @returns generics
 */
export const request = <T = unknown>(url: string, requestOption?: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, any>
}): T => {
  switch (requestOption?.method) {
    case 'POST':
    case 'PUT':
      if (requestOption?.body) {
        localStorage.setItem(url, JSON.stringify(requestOption.body))
        return { success: true } as T
      }
      return { success: false } as T

    case 'DELETE':
      localStorage.removeItem(url)
      return { success: true } as T

    case 'GET':
    default:
      const data = localStorage.getItem(url)
      return data && JSON.parse(data)
  }
}
