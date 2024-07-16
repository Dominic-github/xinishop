import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userInfo: null
}

const userReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addUserSuccess(state, action) {
      state.userInfo = action.payload.userInfo
    },
    userLoginSuccess(state, action) {
      state.userInfo = action.payload.userInfo
      state.isLoggedIn = true
    },
    userLoginFail(state) {
      state.userInfo = null
      state.isLoggedIn = false
    },
    processLogout(state) {
      state.userInfo = null
      state.isLoggedIn = false
    }
  }
})
export const {
  addUserSuccess,
  userLoginSuccess,
  userLoginFail,
  processLogout
} = userReducer.actions
export default userReducer.reducer
