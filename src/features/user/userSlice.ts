import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  loading: boolean
  userInfo: {
    name: string | null
    email: string | null
  }
  userToken: string | null,
  // error: null,
  // success: false
}

const initialState: User = {
  loading: false,
  userInfo: {
    name: '',
    email: null
  },
  userToken: null,
  // error: null,
  // success: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.loading = action.payload.loading
      state.userInfo.name = action.payload.userInfo.name
      state.userInfo.email = action.payload.userInfo.email
      state.userToken = action.payload.userToken
    },
    setLogOutUser: state => {
      state.userInfo.name = '',
        state.userInfo.email = null
    }
  },
  extraReducers: {}
})

export const { setActiveUser, setLogOutUser } = userSlice.actions
export const selectUserName = (state: User) => state.userInfo.name
export const selectUserEmail = (state: User) => state.userInfo.email
export default userSlice.reducer