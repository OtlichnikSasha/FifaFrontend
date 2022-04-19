import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UsersState} from "../../types/index";
import {getPlayers, getPlayer} from '../../api/index'

const initialState : UsersState = {
    users: [],
    status: null,
    error: null,
    loading: false
};
export interface UsersData{
    id? : number
}
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (data: object) => {
        return await getPlayers(data);
    }
)

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (data: object) => {
        return await getPlayer(data);
    }
)

export const fetchUsersOffset = createAsyncThunk(
    'users/fetchUsersOffset',
    async (data: object) => {
        console.log('data', data)
        return await getPlayers(data);
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log('users', action.payload)
                state.loading = false
                state.users = action.payload?.data
                state.status = true
            })
            .addCase(fetchUsers.rejected, state => {
                state.loading = false
            })

            .addCase(fetchUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log('user', action.payload)
                state.loading = false
                state.users = action.payload?.data
                state.status = true
            })
            .addCase(fetchUser.rejected, state => {
                state.loading = false
            })

            .addCase(fetchUsersOffset.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsersOffset.fulfilled, (state, action) => {
                console.log('users', action.payload)
                state.loading = false
                state.users = action.payload?.data
                state.status = true
            })
            .addCase(fetchUsersOffset.rejected, state => {
                state.loading = false
            })

            .addDefaultCase(() => {
            })
    }
})

const { reducer } = usersSlice

export default reducer

