import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UsersReducer from "../store/reducers/usersReducer"
import * as UserReducer from "../store/reducers/userReducer"
import * as GameReducer from "../store/reducers/gameReducer"
import * as LoginUserReducer from "../store/reducers/loginUserReducer"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        ...GameReducer,
        ...UsersReducer,
        ...UserReducer,
        ...LoginUserReducer
    },  dispatch)
}