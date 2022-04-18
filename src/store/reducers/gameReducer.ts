import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {GamesState} from "../../types/index";
import {getGames} from '../../api/index'

const initialState : GamesState = {
    games: [
        {id: 1, player1: "zhuzha", player2: 'zhuzha2', score: "2:1"},
        {id: 2, player1: "zhuzha", player2: 'zhuzha2', score: "2:1"},
        {id: 3, player1: "zhuzha", player2: 'zhuzha2', score: "2:4"},
        {id: 4, player1: "zhuzha", player2: 'zhuzha2', score: "1:3"},
        {id: 5, player1: "zhuzha", player2: 'zhuzha2', score: "1:1"},
    ],
    status: null,
    error: null,
    loading: false
};

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (data: object) => {
        return await getGames(data);
    }
)


export const fetchGamesOffset = createAsyncThunk(
    'games/fetchGamesOffset',
    async (data: object) => {
        console.log('data', data)
        return await getGames(data);
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
            .addCase(fetchGames.fulfilled, (state, action) => {
                console.log('games', action.payload)
                state.loading = false
                state.games = action.payload?.data
                state.status = true
            })
            .addCase(fetchGames.rejected, state => {
                state.loading = false
            })

            .addCase(fetchGamesOffset.pending, state => {
                state.loading = true
            })
            .addCase(fetchGamesOffset.fulfilled, (state, action) => {
                console.log('games', action.payload)
                state.loading = false
                state.games = action.payload?.data
                state.status = true
            })
            .addCase(fetchGamesOffset.rejected, state => {
                state.loading = false
            })

            .addDefaultCase(() => {
            })
    }
})

const { reducer } = gamesSlice

export default reducer

