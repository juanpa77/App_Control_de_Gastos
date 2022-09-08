// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { auth } from '../../services/authProvider'

/* export const loginUser = createAsyncThunk(
  'user/login',
  async () => {
    try {
      auth
    } catch (error) {
      console.log(error)
    }
  } 
) */

/* type Login = {
  uid: string
  displayName: string
}
 */
export const login = () => {
  return {
    type: 'user/login'
  }
}