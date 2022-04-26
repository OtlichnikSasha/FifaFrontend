import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/block/loader";
import {AddNewGames} from "../components/addNewGames";
import {GamesCabinetList} from "../components/gamesCabinetList";
import {Notification} from "../components/block/notification";

export const Cabinet: FC = () => {
    const [page, setPage] = useState(1)
    const [final, setFinal] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [checker, setChecker] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const size = 20;
    const {
        fetchUserCabinet,
        fetchEditUser,
        fetchGamesForCabinet,
        fetchGamesOffsetForCabinet,
    } = useActions()
    const {token} = useContext(AuthContext)
    const [userData, setUserData] = useState({
        id: 0,
        nameSurname: '',
        token: token
    })
    const [open, setOpen] = useState(false)
    const [btnText, setBtnText] = useState('Заполнить данные о сыгранной игре')
    const {user, loading, status, error} = useTypedSelector(state => state.user)
    const {totalElements} = useTypedSelector(state => state.games)
    const gamesLoading = useTypedSelector(state => state.games.loading)
    const getUser = useCallback(() => {
        document.title = "Личный кабинет"
        fetchUserCabinet({token})
    }, [])

    useEffect(() => {
        getUser()
    }, [getUser])

    const getUserGames = useCallback(() => {
        if (!loading && user) {
            fetchGamesForCabinet({id: user.id, page: 0, size})
            setUserData({
                ...userData,
                id: user.id
            })

        }
    }, [user, loading])

    useEffect(() => {
        getUserGames()
    }, [getUserGames])

    const openNewGamePlace = () => {
        if (open) {
            setOpen(false)
            return setBtnText('Заполнить данные о сыгранной игре')
        }
        setOpen(true)
        return setBtnText('Закрыть')
    }
    const addNameSurname = (event: any) => {
        setUserData({
            ...userData,
            nameSurname: event.target.value
        })
    }
    const editUser = () => {
        if (userData.nameSurname) {
            setChecker(true)
            fetchEditUser(userData)
        }
    }

    useEffect(() => {
        if (!final || !fetching) {
            document.addEventListener('scroll', scrollHandler)
            return function () {
                document.removeEventListener('scroll', scrollHandler)
            };
        }
    }, [])
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setFetching(true)
        }
    }

    const getGamesWithOffset = useCallback(() => {
        if (fetching && !gamesLoading && !final && user) {
            // @ts-ignore
            fetchGamesOffsetForCabinet({id: user.id, page, size})
            setFirstLoading(false)
        }
    }, [fetching])

    useEffect(() => {
        getGamesWithOffset()
    }, [getGamesWithOffset])

    const gamesOffsetTrigger = useCallback(() => {
        if(!gamesLoading && !firstLoading){
            if (totalElements < size) setFinal(true)
            else setFinal(false)
            setPage(page + 1)
            setFetching(false)
        }
    }, [totalElements])

    useEffect(() => {
        gamesOffsetTrigger()
    }, [gamesOffsetTrigger])

    const editUserChecker = useCallback(() => {
        if(!loading && checker){
            if(status){
                setFrontendError("Данные успешно изменены")
                setOpenNotification(true)
                setNotificationStatus("success")
                return clearTimeout()
            }
            if(!status && error){
                setFrontendError(error)
                setOpenNotification(true)
                setNotificationStatus("error")
                return clearTimeout()
            }
        }
    }, [checker])

    useEffect(() => {
        editUserChecker()
    }, [editUserChecker])

    const clearTimeout = () => {
        setTimeout(() => {
            setFrontendError('')
            setOpenNotification(false)
            setNotificationStatus("")
            setChecker(false)
            fetchUserCabinet({token})
        }, 3000)

    }

    if (loading) return <Loader/>
    return (
        <div className="container">
            <Notification openNotification={openNotification} frontendError={frontendError}
                          status={notificationStatus}/>
            {
                !user?.nameSurname &&
                <>
                    <div className="label">
                        Вы не заполнили личную информацию о себе. С ней другим игрокам будет проще вас находить.
                    </div>
                    <div className="label">Введите имя и фамилию</div>
                    <input className="default_input" placeholder="Введите имя и фамилию" onChange={addNameSurname}/>
                    {
                        userData.nameSurname &&
                        <div className="default_btn" onClick={editUser}>Сохранить</div>
                    }
                </>
            }
            <div className="default_btn" onClick={openNewGamePlace}>
                {btnText}
            </div>
            {/*New game*/}
            {open && <AddNewGames/>}
            {/*UserData*/}
            <div className="user_data_place">
                <div className="heading">
                    {user?.username} {user?.nameSurname && (user?.nameSurname)} ({user?.rating})
                </div>
            </div>
            <GamesCabinetList/>
        </div>
    );
};

