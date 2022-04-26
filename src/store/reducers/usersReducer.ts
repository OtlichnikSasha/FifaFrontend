import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UsersState} from "../../types/index";
import {getPlayers} from '../../api/index'

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


export const fetchUsersOffset = createAsyncThunk(
    'users/fetchUsersOffset',
    async (data: object) => {
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
            .addCase(fetchUsers.fulfilled, (state:UsersState, action) => {
                state.loading = false
                // @ts-ignore
                state.users = action.payload.data.content
                state.status = true
            })
            .addCase(fetchUsers.rejected, state => {
                state.loading = false
            })

            .addCase(fetchUsersOffset.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsersOffset.fulfilled, (state, action) => {
                state.loading = false
                state.users = state.users.concat(action.payload.data)
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

