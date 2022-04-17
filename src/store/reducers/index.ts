import {combineReducers} from "redux";
import gameReducer from "./gameReducer";
import usersReducer from "./usersReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    games: gameReducer,
    users: usersReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>