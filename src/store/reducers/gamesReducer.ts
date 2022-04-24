import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {GamesState} from "../../types/index";
import {getCabinetGames, getGames, getGamesUser} from '../../api/index'

const initialState : GamesState = {
    games: [],
    status: null,
    error: null,
    loading: false
};
interface CabinetGames{
    id: number,
    page: number,
    size: number
}
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (args: object) => {
        return await getGames(args);
    }
)


export const fetchGamesOffset = createAsyncThunk(
    'games/fetchGamesOffset',
    async (data: object) => {
        console.log('data', data)
        return await getGames(data);
    }
)

export const fetchGamesForCabinet = createAsyncThunk(
    'games/fetchGamesForCabinet',
    async (data: CabinetGames) => {
        return await getCabinetGames(data);
    }
)
interface GameUser{
    id: string
}
export const fetchGamesForUser = createAsyncThunk(
    'games/fetchGamesForUser',
    async (data: GameUser) => {
        return await getGamesUser(data);
    }
)


const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, state => {
                state.loading = true
            })
            .addCase(fetchGames.fulfilled, (state: GamesState, action) => {
                console.log('games', action.payload)
                state.loading = false
                //@ts-ignore
                state.games = action.payload.data.content
                state.status = true
            })
            .addCase(fetchGames.rejected, state => {
                state.loading = false
            })

            .addCase(fetchGamesOffset.pending, state => {
                state.loading = true
            })
            .addCase(fetchGamesOffset.fulfilled, (state: GamesState, action) => {
                console.log('games', action.payload)
                state.loading = false
                //@ts-ignore
                state.games = state.games.concat(action.payload.data.content)
                state.status = true
            })
            .addCase(fetchGamesOffset.rejected, state => {
                state.loading = false
            })
            // Cabinet Games
            .addCase(fetchGamesForCabinet.pending, state => {
                state.loading = true
            })
            .addCase(fetchGamesForCabinet.fulfilled, (state: GamesState, action) => {
                console.log('games', action.payload)
                state.loading = false
                //@ts-ignore
                state.games = action.payload.data.content
                state.status = true
            })
            .addCase(fetchGamesForCabinet.rejected, state => {
                state.loading = false
            })

            // User Games
            .addCase(fetchGamesForUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchGamesForUser.fulfilled, (state: GamesState, action) => {
                console.log('games', action.payload)
                state.loading = false
                //@ts-ignore
                state.games = action.payload.data.content
                state.status = true
            })
            .addCase(fetchGamesForUser.rejected, state => {
                state.loading = false
            })

            .addDefaultCase(() => {
            })
    }
})

const { reducer } = gamesSlice

export default reducer

