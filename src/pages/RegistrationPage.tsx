import React, {FC, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Notification} from "../components/block/notification";
import {Link} from "react-router-dom";

export const RegistrationPage: FC = () => {
    useEffect(() => {
        document.title = "Регистрация"
    }, [])
    const {fetchRegistration} = useActions()
    const {user, status, loading, error} = useTypedSelector(state => state.user)

    const [registrationData, setRegistrationData] = useState({
        login: '',
        password: '',
        repeatPassword: ''
    })
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const changeHandler = (event: any) => {
        setRegistrationData({
            ...registrationData,
            [event.target.name]: event.target.value,
        })
    }

    const registration = () => {
        if(!registrationData.login){
            setFrontendError("Вы не ввели логин!")
            setNotificationStatus("error")
            setOpenNotification(true)
            return clearTimeout()
        }
        if(registrationData.password.length < 9){
            setFrontendError("Пароль должен быть больше 8 символов")
            setNotificationStatus("error")
            setOpenNotification(true)
            return clearTimeout()
        }
        if(registrationData.password !== registrationData.repeatPassword){
            setFrontendError("Пароли не совпадают")
            setNotificationStatus("error")
            setOpenNotification(true)
            return clearTimeout()
        }
        return fetchRegistration(registrationData)
    }

    useEffect(() => {
        if(user && !loading && status){
            setFrontendError("Вы успешно зарегистрированы")
            setNotificationStatus("success")
            setOpenNotification(true)
            clearTimeout()
        }
        if(!status && error){
            setFrontendError(error)
            setNotificationStatus("error")
            setOpenNotification(true)
            clearTimeout()
        }
    }, [user, status])

    const clearTimeout = () => {
        return setTimeout(() => {
            setFrontendError("")
            setOpenNotification(false)
        }, 3000)
    }

    return (
        <div className="modal_window_place">
            <Notification openNotification={openNotification} frontendError={frontendError} status={notificationStatus}/>
            <div className="modal_window">
                <h1 className="heading">
                    Регистрация
                </h1>
                <div className="label">
                    Введите логин (ник в Fifa Mobile)
                </div>
                <input
                    className="default_input"
                    name="login"
                    onChange={changeHandler}
                    value={registrationData.login}
                />
                <div className="label">
                    Придумайте пароль
                </div>
                <input
                    className="default_input"
                    name="password"
                    onChange={changeHandler}
                    value={registrationData.password}
                    type="password"
                />
                <div className="label">
                    Повторите пароль
                </div>
                <input
                    className="default_input"
                    name="repeatPassword"
                    onChange={changeHandler}
                    value={registrationData.repeatPassword}
                    type="password"
                />
                <div className="default_btn" onClick={registration}>
                    Зарегистрироваться
                </div>
                <div className="offer_go_place">
                    <Link to="/user/sign_in" className="offer_go">Уже есть аккаунт? Авторизоваться</Link>
                </div>
            </div>
        </div>
    );
};

