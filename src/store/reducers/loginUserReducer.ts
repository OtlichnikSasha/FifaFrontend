import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../../api/index'

const initialState = {
    loading: false,
    loginError: false,
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

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.username = action.payload
        },
        setErrors: (state) => {
            state.loginError = false
        },
        setAuthenticated: (state) => {
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, state => {
                state.loading = true
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                // if (action.payload.success) {
                //     state.username = action.payload.data.username
                // } else if (action.payload.error) {
                //     state.loginError = true
                // }
                // state.loading = false
            })
            .addCase(authLogin.rejected, (state) => {
                state.loading = false
            })
            .addDefaultCase(() => {
            })
    }
})

const { actions, reducer } = userLoginSlice

export default reducer

export const {
    setName,
    setErrors,
    setAuthenticated
} = actions