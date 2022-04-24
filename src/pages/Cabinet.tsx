import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/block/loader";
import {Notification} from "../components/block/notification";
import {AddNewGames} from "../components/addNewGames";

export const Cabinet: FC = () => {
    const {fetchUserCabinet, fetchEditUser, fetchGamesForCabinet, clearUserState} = useActions()
    const {token} = useContext(AuthContext)
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const [userData, setUserData] = useState({
        id: 0,
        nameSurname: '',
        token: token
    })
    const [checker, setChecker] = useState(false)
    const [open, setOpen] = useState(false)
    const [btnText, setBtnText] = useState('Заполнить данные о сыгранной игре')
    const {user, loading, error, status} = useTypedSelector(state => state.user)

    const {games} = useTypedSelector(state => state.games)
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
            fetchGamesForCabinet({id: user.id})
            setUserData({
                ...userData,
                id: user.id
            })

        }
    }, [user, loading])

    useEffect(() => {
        getUserGames()
    }, [getUserGames])


    if (loading) {
        return <Loader/>
    }
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

    // const editUserChecker = useCallback(() => {
    //     if (!loading && checker) {
    //         if (status) {
    //             return fetchUserCabinet({token})
    //         }
    //         if (!status && error) {
    //             setFrontendError(error)
    //             setOpenNotification(true)
    //             setNotificationStatus("error")
    //             return clearTimeout()
    //         }
    //     }
    // }, [checker, loading])
    //
    // useEffect(() => {
    //     editUserChecker()
    // }, [editUserChecker])

    const clearTimeout = () => {
        return setTimeout(() => {
            setOpenNotification(false)
            setFrontendError("")
            setNotificationStatus("")
            setChecker(false)
            clearUserState()
        }, 3000)
    }
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
            {!gamesLoading && games && games.length ? games.map(game => {
                    return (
                        <div className="games_card" key={game.id}>
                            <div className="games_card__teams_place">
                                <Link to={`/user/${game.players[0].id}`}
                                      className={game.score.split(":")[0] > game.score.split(":")[1] ? "games_card__data winner" : "games_card__data"}>
                                    {game.players[0].username}
                                </Link>
                                <Link to={`/user/${game.players[1].id}`}
                                      className={game.score.split(":")[1] > game.score.split(":")[0] ? "games_card__data winner" : "games_card__data"}>
                                    {game.players[1].username}
                                </Link>
                            </div>
                            <div className="games_card__score_place">
                                <div
                                    className={game.score.split(":")[0] > game.score.split(":")[1] ? "games_card__data winner" : "games_card__data"}>
                                    {game.score.split(":")[0]}
                                </div>
                                <div
                                    className={game.score.split(":")[1] > game.score.split(":")[0] ? "games_card__data winner" : "games_card__data"}>
                                    {game.score.split(":")[1]}
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div>Вы пока не играли матчей.</div>
            }
        </div>
    );
};

