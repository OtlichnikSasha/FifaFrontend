import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UsersState} from "../../types/index";
import {getPlayers} from '../../api/index'

const initialState : UsersState = {
    users: [],
    status: null,
    error: null,
    loading: false,
    totalElements: 0
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
                // @ts-ignore
                state.totalElements = action.payload.data.totalElements
                state.status = action.payload.status
            })
            .addCase(fetchUsers.rejected, state => {
                state.loading = false
            })

            .addCase(fetchUsersOffset.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsersOffset.fulfilled, (state:UsersState, action) => {
                state.loading = false
                // @ts-ignore
                state.users = state.users.concat(action.payload.data.content)
                //@ts-ignore
                state.totalElements = action.payload.data.totalElements
                state.status = action.payload.status
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

