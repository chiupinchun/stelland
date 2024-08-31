import { request } from "../core/request"

interface UserInfo {
  weapon: number | null
  blessings: number[]
  items: number[]
}

export const createUser = (payload: UserInfo) => {
  return request('/orb-match/user', {
    method: 'POST',
    body: payload
  })
}

export const getUserInfo = () => {
  return request<UserInfo>('/orb-match/user')
}

export const updateUserInfo = (payload: UserInfo) => {
  return request('/orb-match/user', {
    method: 'PUT',
    body: payload
  })
}

export const deleteUserInfo = () => {
  return request('/orb-match/user', {
    method: 'DELETE'
  })
}
