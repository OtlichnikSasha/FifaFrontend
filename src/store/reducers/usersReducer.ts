import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UsersState} from "../../types/index";
import {getPlayers} from '../../api/index'

const initialState : UsersState = {
    users: [
        {id: 1, username: "Durak", rating: 90},
        {id: 2, username: "Durak2", rating: 90},
        {id: 3, username: "Durak3", rating: 90},
        {id: 4, username: "Durak4", rating: 90},
        {id: 5, username: "Durak5", rating: 90},
        {id: 6, username: "Durak6", rating: 90},
        {id: 7, username: "Durak7", rating: 90}
    ],
    status: null,
    error: null,
    loading: false
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (data: object) => {
        return await getPlayers(data);
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

