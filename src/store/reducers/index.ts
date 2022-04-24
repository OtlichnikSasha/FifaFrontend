import {combineReducers} from "redux";
import gameReducer from "./gameReducer";
import gamesReducer from "./gamesReducer";
import usersReducer from "./usersReducer";
import userReducer from "./userReducer";
import userLoginReducer from "./loginUserReducer";
import userSearchReducer from "./searchUsersReducer";

export const rootReducer = combineReducers({
    game: gameReducer,
    games: gamesReducer,
    users: usersReducer,
    user: userReducer,
    userLogin: userLoginReducer,
    usersSearch: userSearchReducer
})

export type RootState = ReturnType<typeof rootReducer>