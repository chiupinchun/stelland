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

export const getUserInfo = async () => {
  let user = request<UserInfoResponse>('/orb-match/user')

  if (!user) {
    user = {
      weapon: null,
      blessings: [],
      items: []
    }
    createUser(user)
  }

  return user
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
