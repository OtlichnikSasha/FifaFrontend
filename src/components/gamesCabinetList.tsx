import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Notification} from "./block/notification";
import {fetchGamesForCabinet} from "../store/reducers/gamesReducer";

export const GamesCabinetList: FC = () => {
    const page = 0;
    const size = 20;
    const {fetchAcceptGame, fetchRemoveGame, clearGameState} = useActions()
    const {games, loading} = useTypedSelector(state => state.games)
    const {user} = useTypedSelector(state => state.user)
    const {game, error, status} = useTypedSelector(state => state.game)
    const gameLoading = useTypedSelector(state => state.game.loading)
    const [checker, setChecker] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [frontendError, setFrontendError] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('')
    const acceptMatch = (id: number) => {
        fetchAcceptGame({id})
        setChecker(true)
    }
    const removeMatch = (id: number) => {
        fetchRemoveGame({id})
        setChecker(true)
    }
    const gameChecker = useCallback(() => {
        if (!gameLoading && checker) {
            if (status) {
                //@ts-ignore
                return fetchGamesForCabinet({id: user.id, page, size})
            }
            if (!status && error) {
                setFrontendError(error)
                setOpenNotification(true)
                setNotificationStatus("error")
                return clearTimeout()
            }
        }
    }, [checker, gameLoading])

    useEffect(() => {
        gameChecker()
    }, [gameChecker])

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
            {!loading && games && games.length ? games.map(game => {
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
                            {
                                !game.status && game.players[0].id === user?.id ?
                                    <div className="games_card__accept_data">
                                        Ожидается подтверждение от {game.players[1].username}
                                    </div>
                                    :
                                    <></>
                            }
                            {
                                !game.status && game.players[0].id !== user?.id ?
                                    <div className="games_card__accept_data">
                                        <div className="default_btn" onClick={() => acceptMatch(game.id)}>
                                            Согласиться с результатом
                                        </div>
                                        <div className="default_btn" onClick={() => removeMatch(game.id)}>
                                            Не согласиться с результатом
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
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
        </>
    );
};

