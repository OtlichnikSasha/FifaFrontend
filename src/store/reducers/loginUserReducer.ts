import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {login, logout} from '../../api/index'
import {LoginState} from "../../types";

const initialState: LoginState = {
    loading: false,
    loginError: '',
    username: null,
    isAuthenticated: false,
    token: ''
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
        setUser: (state, action) => {
            console.log('action payload', state, action)
            state.username = action.payload.username
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setAuthenticated: (state, action) => {
            console.log('setAuthenticated', state, action)
            state.isAuthenticated = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(authLogin.pending, state => {
                state.loading = true
            })
            .addCase(authLogin.fulfilled, (state: LoginState, action) => {
                console.log('action.payload authLogin', action.payload)
                // @ts-ignore
                state.username = action.payload.data?.username
                // @ts-ignore
                state.token = action.payload?.data?.token
                // @ts-ignore
                state.loginError = action.payload?.data?.error
                state.loading = false
            })
            .addCase(authLogin.rejected, (state) => {
                state.loading = false
            })
            // Logout
            .addCase(authLogout.pending, state => {
                state.loading = true
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                console.log('action.payload authLogout', action.payload)
            })
            .addCase(authLogout.rejected, (state) => {
                state.loading = false
            })


            .addDefaultCase(() => {
            })
    }
})

const { actions, reducer } = userLoginSlice

export default reducer

export const {
    setUser,setAuthenticated
} = actions