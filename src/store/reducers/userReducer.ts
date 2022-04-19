import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UserState} from "../../types/index";
import {getPlayer, login, registration, getPlayerForCabinet} from '../../api/index'

const initialState : UserState = {
    user: null,
    status: null,
    error: null,
    loading: false
};

export const fetchUserCabinet = createAsyncThunk(
    'user/fetchUserCabinet',
    async () => {
        return await getPlayerForCabinet();
    }
)

export const fetchRegistration = createAsyncThunk(
    'user/fetchRegistration',
    async (data: object) => {
        return await registration(data);
    }
)

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async (data: object) => {
        return await login(data);
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCabinet.pending, state => {
                state.loading = true
            })
            .addCase(fetchUserCabinet.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                state.user = action.payload?.data
                state.status = true
            })
            .addCase(fetchUserCabinet.rejected, state => {
                state.loading = false
            })
            // Login
            .addCase(fetchLogin.pending, state => {
                state.loading = true
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                state.user = action.payload?.data
                state.status = true
                state.error = action.payload?.error
            })
            .addCase(fetchLogin.rejected, state => {
                state.loading = false
            })
            // Registration
            .addCase(fetchRegistration.pending, state => {
                state.loading = true
            })
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                state.user = action.payload?.data
                state.status = true
                state.error = action.payload?.error
            })
            .addCase(fetchRegistration.rejected, state => {
                state.loading = false
            })





            .addDefaultCase(() => {
            })
    }
})

const { reducer } = userSlice

export default reducer

