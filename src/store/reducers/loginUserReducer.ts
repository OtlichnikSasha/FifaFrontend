import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {login, logout} from '../../api/index'
import {LoginState} from "../../types";

const initialState: LoginState = {
    loading: false,
    loginError: '',
    username: null,
    isAuthenticated: false,
    token: '',
    player_id: 0
}

export const authLogin = createAsyncThunk(
    'userLogin/authLogin',
    async (data: object) => {
        return await login(data)
    }
)

export const authLogout = createAsyncThunk(
    'userLogin/authLogout',
    async () => {
        return await logout()
    }
)

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        clearLoginUserState: state => {
            state.loading = false
            state.loginError = ''
            state.username = null
            state.isAuthenticated = false
            state.player_id = 0
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(authLogin.pending, state => {
                state.loading = true
            })
            .addCase(authLogin.fulfilled, (state: LoginState, action) => {
                // @ts-ignore
                state.username = action.payload.data?.username
                // @ts-ignore
                state.token = action.payload.data?.token
                // @ts-ignore
                state.player_id = action.payload.data?.player_id
                state.loginError = action.payload.error
                state.loading = false
            })
            .addCase(authLogin.rejected, (state) => {
                state.loading = false
            })
            // Logout
            .addCase(authLogout.pending, state => {
                state.loading = true
            })
            .addCase(authLogout.rejected, (state) => {
                state.loading = false
            })


            .addDefaultCase(() => {
            })
    }
})

const { actions, reducer} = userLoginSlice

export default reducer

export const {
    clearLoginUserState
} = actions