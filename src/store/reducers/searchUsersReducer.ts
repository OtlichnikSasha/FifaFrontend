import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UsersState} from "../../types/index";
import {getSearchUsers} from '../../api/index'

const initialState : UsersState = {
    users: [],
    status: null,
    error: null,
    loading: false,
    totalElements: 0
};
interface CabinetHeaders{
    token: string
}
export const fetchUsersSearch = createAsyncThunk(
    'usersSearch/fetchUsersSearch',
    async (args: CabinetHeaders) => {
        return await getSearchUsers(args);
    }
)

const usersSearchSlice = createSlice({
    name: 'usersSearch',
    initialState,
    reducers: {
        clearUsersState: state => {
            state.loading = false
            state.users = []
            state.status = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersSearch.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsersSearch.fulfilled, (state: UsersState, action) => {
                state.loading = false
                state.users = action.payload.data
                state.status = true
            })
            .addCase(fetchUsersSearch.rejected, state => {
                state.loading = false
            })

            .addDefaultCase(() => {
            })
    }
})

const { actions, reducer} = usersSearchSlice
export const {
    clearUsersState
} = actions
export default reducer

