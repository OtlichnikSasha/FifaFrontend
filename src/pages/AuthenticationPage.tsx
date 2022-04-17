import React, {FC, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Notification} from "../components/block/notification";
import {Link} from "react-router-dom";

export const AuthenticationPage: FC = () => {
    useEffect(() => {
        document.title = "Авторизация"
    }, [])
    const {fetchLogin} = useActions()
    const {user, status, loading, error} = useTypedSelector(state => state.user)

    const [authData, setAuthData] = useState({
        login: '',
        password: '',
        repeatPassword: ''
    })
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const changeHandler = (event: any) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value,
        })
    }

    const login = () => {
        if (!authData.login) {
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
        return fetchLogin(authData)
    }

    const clearTimeout = () => {
        return setTimeout(() => {
            setOpenNotification(false)
            setFrontendError("")
            setNotificationStatus("")
        }, 3000)
    }

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
                    name="login"
                    onChange={changeHandler}
                    value={authData.login}
                />
                <div className="label">
                    Введите пароль
                </div>
                <input
                    className="default_input"
                    name="password"
                    onChange={changeHandler}
                    value={authData.password}
                />
                <div className="default_btn" onClick={login}>
                    Войти
                </div>

                <div className="offer_go_place">
                    <Link to="/user/sign_up" className="offer_go">Нет аккаунта? Зарегистрироваться</Link>
                </div>

            </div>
        </div>
    );
};

