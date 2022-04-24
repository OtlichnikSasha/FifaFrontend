import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UsersReducer from "../store/reducers/usersReducer"
import * as UserReducer from "../store/reducers/userReducer"
import * as GamesReducer from "../store/reducers/gamesReducer"
import * as GameReducer from "../store/reducers/gameReducer"
import * as LoginUserReducer from "../store/reducers/loginUserReducer"
import * as UsersSearchReducer from "../store/reducers/searchUsersReducer"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        ...GameReducer,
        ...GamesReducer,
        ...UsersReducer,
        ...UserReducer,
        ...LoginUserReducer,
        ...UsersSearchReducer,
    },  dispatch)
}