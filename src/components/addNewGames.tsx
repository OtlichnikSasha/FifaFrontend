import React, {useCallback, useContext, useEffect, useState} from 'react';
import {UserEntity} from "../types";
import {AuthContext} from "../context/AuthContext";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Notification} from "./block/notification";

export const AddNewGames = () => {
    const {fetchUsersSearch, fetchCreateGame, fetchGamesForCabinet, clearGameState} = useActions()
    const {token} = useContext(AuthContext)
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    // @ts-ignore
    const [rival, setRival] = useState<UserEntity>({})
    const [searchData, setSearchData] = useState({
        username: '',
        token: token
    })
    const [scoreUser, setScoreUser] = useState(0)
    const [scoreRival, setScoreRival] = useState(0)
    const [checker, setChecker] = useState(false)
    const {user, loading} = useTypedSelector(state => state.user)
    const {users} = useTypedSelector(state => state.usersSearch)
    const searchLoading = useTypedSelector(state => state.usersSearch.loading)
    const {status, error} = useTypedSelector(state => state.game)
    const matchLoading = useTypedSelector(state => state.game.loading)

    const changeRival = (user: UserEntity) => setRival(user)
    const changeHandler = (event: any) => {
        if (event.target.value) {
            setSearchData({
                ...searchData,
                username: event.target.value,
            })

            setTimeout(() => {
                fetchUsersSearch(searchData)
                // @ts-ignore
            }, [1000])
        }
    }

    const changeUserScore = (event: any) => setScoreUser(event.target.value)
    const changeRivalScore = (event: any) => setScoreRival(event.target.value)
    const addMatch = () => {
        if(user && rival && scoreRival && scoreUser){
            console.log('addMatch', rival, scoreRival, scoreUser)
            const gameData = {
                player1: {id: user?.id},
                player2: {id: rival.id},
                score: `${scoreUser}:${scoreRival}`
            }
            setChecker(true)
            fetchCreateGame(gameData)

        }
    }
    const matchChecker = useCallback(() => {
        if(!matchLoading && checker){
            if(status){
                // @ts-ignore
                return fetchGamesForCabinet({id: user.id})
            }
            if(!status && error){
                setFrontendError(error)
                setOpenNotification(true)
                setNotificationStatus("error")
                return clearTimeout()
            }
        }

    }, [checker, matchLoading])

    useEffect(() => {
        matchChecker()
    }, [matchChecker])

    const clearTimeout = () => {
        return setTimeout(() => {
            setOpenNotification(false)
            setFrontendError("")
            setNotificationStatus("")
            setChecker(false)
            clearGameState()
        }, 3000)
    }

    return (
        <>
            <Notification openNotification={openNotification} frontendError={frontendError}
                          status={notificationStatus}/>
            <div className="user_new_game_place">
                <div className="user_new_game__item">
                    {user?.username} {user?.nameSurname} ({user?.rating})
                </div>
                <div className="user_new_game__item">
                    vs
                </div>
                <div className="user_new_game__item">
                            <span>
                                {rival?.username} {rival?.nameSurname ? (rival?.nameSurname) : ''}
                                {(rival?.rating)}
                            </span>
                    <input className="default_input" onChange={changeHandler} />
                    <div className="users_search_items">
                        {
                            !searchLoading && users.length ? users.map(user => {
                                    return (
                                        <div className="user_search_item" key={user.id}
                                             onClick={() => changeRival(user)}>
                                            {user.username}
                                        </div>
                                    )
                                })
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            <div className="user_new_game_place">
                <div className="user_new_game__item"/>
                <div className="user_new_game__item">
                    <div className="score_input_place">
                        <input className="score_input" type="number" onChange={changeUserScore}/>
                        <span>:</span>
                        <input className="score_input" type="number" onChange={changeRivalScore}/>
                    </div>
                </div>
                <div className="user_new_game__item"/>
            </div>
            {
                rival &&
                <div className="default_btn" onClick={addMatch}>
                    Сохранить
                </div>
            }
        </>
    );
};

