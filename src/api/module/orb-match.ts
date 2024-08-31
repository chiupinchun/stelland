import { request } from "../core/request"

export interface UserInfoResponse {
  weapon: number | null
  blessings: number[]
  items: number[]
}

export const createUser = (payload: UserInfoResponse) => {
  return request('/orb-match/user', {
    method: 'POST',
    body: payload
  })
}

export const getUserInfo = () => {
  return request<UserInfoResponse>('/orb-match/user')
}

export const updateUserInfo = (payload: UserInfoResponse) => {
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
