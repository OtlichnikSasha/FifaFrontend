import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UserState} from "../../types/index";
import {getPlayer, login, registration, getPlayerForCabinet} from '../../api/index'

const initialState : UserState = {
    user: null,
    status: null,
    error: null,
    loading: false
};
interface CabinetHeaders{
    token: string
}
export const fetchUserCabinet = createAsyncThunk(
    'user/fetchUserCabinet',
    async (headers: CabinetHeaders) => {
        return await getPlayerForCabinet(headers);
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (args: object) => {
        return await getPlayer(args);
    }
)

export const fetchRegistration = createAsyncThunk(
    'user/fetchRegistration',
    async (data: object) => {
        return await registration(data);
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
                // @ts-ignore
                state.user = action.payload?.data
                state.status = true
            })
            .addCase(fetchUserCabinet.rejected, state => {
                state.loading = false
            })
            // Registration
            .addCase(fetchRegistration.pending, state => {
                state.loading = true
            })
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                // @ts-ignore
                state.user = action.payload?.data
                state.status = action.payload?.status
                state.error = action.payload?.error
            })
            .addCase(fetchRegistration.rejected, state => {
                state.loading = false
            })

            // GetUser
            .addCase(fetchUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                // @ts-ignore
                state.user = action.payload?.data
                state.status = true
                state.error = action.payload?.error
            })
            .addCase(fetchUser.rejected, state => {
                state.loading = false
            })

            .addDefaultCase(() => {
            })
    }
})

const { reducer } = userSlice

export default reducer

