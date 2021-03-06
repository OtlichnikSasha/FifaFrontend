import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import {UserEntity} from "../types";
import {AuthContext} from "../context/AuthContext";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Notification} from "./block/notification";
import {SearchList} from "./searchList";

export const AddNewGames = () => {
    const {fetchUsersSearch, fetchCreateGame, fetchGamesForCabinet, clearGameState, clearUsersState} = useActions()
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
    const searchRef = useRef(null)
    const [scoreUser, setScoreUser] = useState(0)
    const [scoreRival, setScoreRival] = useState(0)
    const [checker, setChecker] = useState(false)
    const {users} = useTypedSelector(state => state.usersSearch)
    const {user} = useTypedSelector(state => state.user)
    const {status, error} = useTypedSelector(state => state.game)
    const matchLoading = useTypedSelector(state => state.game.loading)
    const changeRival = (user: UserEntity) => {
        setRival(user)
        clearUsersState()
        // @ts-ignore
        searchRef.current.value = null;
    }
    // @ts-ignore
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

    const changeUserScore = (event: any) => {
        event.target.value = event.target.value.replace("-", '')
        setScoreUser(event.target.value)
    }
    const changeRivalScore = (event: any) => {
        event.target.value = event.target.value.replace("-", '')
        setScoreRival(event.target.value)
    }
    const addMatch = () => {
        if (user && rival && scoreRival && scoreUser) {
            const gameData = {
                player1: {id: user?.id},
                player2: {id: rival.id},
                scoreOne: `${scoreUser}`,
                scoreTwo: `${scoreRival}`,
                creatorId: user?.id

            }
            setChecker(true)
            fetchCreateGame(gameData)
        }
    }
    const matchChecker = useCallback(() => {
        if (!matchLoading && checker) {
            if (status) {
                setFrontendError("")
                setOpenNotification(true)
                setNotificationStatus("success")
                // @ts-ignore
                fetchGamesForCabinet({id: user.id})
                return clearTimeout()
            }
            if (!status && error) {
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
                                {rival?.username} {rival?.nameSurname} {rival ? (rival.rating) : ''}
                            </span>
                    <input className="default_input" ref={searchRef} onChange={changeHandler}/>
                    {users.length ? <SearchList changeRival={changeRival}/> : <></>}
                </div>
            </div>
            <div className="user_new_game_place">
                <div className="user_new_game__item"/>
                <div className="user_new_game__item">
                    <div className="score_input_place">
                        <input className="score_input" type="number" min="0" onChange={changeUserScore}/>
                        <span>:</span>
                        <input className="score_input" type="number" min="0" onChange={changeRivalScore}/>
                    </div>
                </div>
                <div className="user_new_game__item"/>
            </div>
            {
                rival.hasOwnProperty('id') && scoreRival && scoreUser ?
                    <div className="default_btn" onClick={addMatch}>
                        ??????????????????
                    </div>
                    :
                    <></>
            }
        </>
    );
};

