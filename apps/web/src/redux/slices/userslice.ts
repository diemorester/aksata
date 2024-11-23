import { UserSlice } from "@/types/userTypes"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserSlice = {
    id: 0,
    name: '',
    email: '',
    avatar: null,
    isVerified: false,
    role: null,
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<UserSlice>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.isVerified = action.payload.isVerified
            state.role = action.payload.role
            state.token = action.payload.token
        },

        logoutAction: (state) => {
            state.id = 0,
            state.name = '',
            state.email = '',
            state.avatar = null,
            state.isVerified = false,
            state.role = null,
            state.token = ''
        }
    }
})

export const { loginAction, logoutAction } = userSlice.actions
export default userSlice.reducer