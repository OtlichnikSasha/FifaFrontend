import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {GameState} from "../../types/index";
import {createGame, acceptGame, removeGame} from '../../api/index'

const initialState: GameState = {
    game: null,
    status: null,
    error: null,
    loading: false
};

export const fetchCreateGame = createAsyncThunk(
    'game/fetchGame',
    async (data: object) => {
        return await createGame(data);
    }
)

export const fetchAcceptGame = createAsyncThunk(
    'game/fetchAcceptGame',
    async (data: object) => {
        return await acceptGame(data);
    }
)
interface DeleteArgs{
    id: number
}
export const fetchRemoveGame = createAsyncThunk(
    'game/fetchRemoveGame',
    async (args: DeleteArgs) => {
        return await removeGame(args);
    }
)

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        clearGameState: state => {
            state.loading = false
            state.game = null
            state.status = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateGame.pending, state => {
                state.loading = true
            })
            .addCase(fetchCreateGame.fulfilled, (state: GameState, action) => {
                console.log('game', action.payload)
                state.loading = false
                //@ts-ignore
                state.game = action.payload?.data
                state.status = true
                state.error = action.payload.error
            })
            .addCase(fetchCreateGame.rejected, state => {
                state.loading = false
            })


            .addDefaultCase(() => {
            })
    }
})

const { actions, reducer} = gameSlice
export const {
    clearGameState
} = actions
export default reducer

