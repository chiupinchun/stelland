import { request } from "../core/request"

interface UserInfo {
  weapon: number | null
  blessings: number[]
  items: number[]
}

export const createUser = () => {
  return request('/orb-match/user', {
    method: 'POST',
    body: {
      weapon: null,
      blessing: [],
      items: []
    }
  })
}

export const getUser = () => {
  return request<UserInfo>('/orb-match/user')
}

export const updateUser = (payload: UserInfo) => {
  return request('/orb-match/user', {
    method: 'PUT',
    body: payload
  })
}

export const deleteUser = () => {
  return request('/orb-match/user', {
    method: 'DELETE'
  })
}
