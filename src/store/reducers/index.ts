import {combineReducers} from "redux";
import gameReducer from "./gameReducer";
import usersReducer from "./usersReducer";
import userReducer from "./userReducer";
import userLoginReducer from "./loginUserReducer";

export const rootReducer = combineReducers({
    games: gameReducer,
    users: usersReducer,
    user: userReducer,
    userLogin: userLoginReducer

})

export type RootState = ReturnType<typeof rootReducer>