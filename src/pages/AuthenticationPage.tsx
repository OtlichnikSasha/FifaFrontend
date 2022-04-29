import React, {FC, useEffect, useState, useContext, useCallback} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Notification} from "../components/block/notification";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const AuthenticationPage: FC = () => {
    useEffect(() => {
        document.title = "Авторизация"
    }, [])
    const auth = useContext(AuthContext)
    const {authLogin, clearLoginUserState} = useActions()
    const navigate = useNavigate();
    const {username, loading, token, loginError} = useTypedSelector(state => state.userLogin)
    const [authData, setAuthData] = useState({
        username: '',
        password: '',
    })
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const [checker, setChecker] = useState(false)
    const changeHandler = (event: any) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value,
        })
    }

    const login = () => {
        if (!authData.username) {
            setFrontendError("Вы не ввели логин!")
            setOpenNotification(true)
            setNotificationStatus("error")
            return clearTimeout()
        }
        if (!authData.password.length) {
            setFrontendError("Вы не ввели пароль")
            setOpenNotification(true)
            setNotificationStatus("error")
            return clearTimeout()
        }
        authLogin(authData)
        return setChecker(true)
    }

    const clearTimeout = () => {
        return setTimeout(() => {
            setOpenNotification(false)
            setFrontendError("")
            setNotificationStatus("")
            clearLoginUserState()
        }, 3000)
    }

    const checkerError = useCallback(() => {
        if(!loading && username && token){
            auth.login(token, username)
            clearLoginUserState()
            return navigate("/topPlayers")
        }
        if(loginError && !loading){
            setFrontendError(loginError)
            setOpenNotification(true)
            setNotificationStatus("error")
            return clearTimeout()
        }
    }, [checker, loading])

    useEffect(() => {
        checkerError()
    }, [checkerError])

    return (
        <div className="modal_window_place">
            <Notification openNotification={openNotification} frontendError={frontendError}
                          status={notificationStatus}/>
            <div className="modal_window">
                <h1 className="heading">
                    Авторизация
                </h1>
                <div className="label">
                    Введите логин (ник в Fifa Mobile)
                </div>
                <input
                    className="default_input"
                    name="username"
                    onChange={changeHandler}
                    value={authData.username}
                />
                <div className="label">
                    Введите пароль
                </div>
                <input
                    className="default_input"
                    name="password"
                    onChange={changeHandler}
                    value={authData.password}
                    type="password"
                />
                <div className="default_btn" onClick={login}>
                    Войти
                </div>
                <div className="offer_go_place">
                    <span>Нет аккаунта?</span><Link to="/user/sign_up" className="offer_go"> Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

