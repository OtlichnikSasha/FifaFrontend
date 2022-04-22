import React, {FC, useContext, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchUserCabinet} from "../store/reducers/userReducer";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/block/loader";
import {UserEntity} from "../types";

export const Cabinet: FC = () => {
    const {fetchUserCabinet, fetchUsersSearch} = useActions()
    const {user, loading} = useTypedSelector(state => state.user)
    const {users} = useTypedSelector(state => state.users)
    const searchLoading = useTypedSelector(state => state.users.loading)
    const {token} = useContext(AuthContext)
    useEffect(() => {
        document.title = "Личный кабинет"
        fetchUserCabinet({token})
    }, [])
    const [rival, setRival] = useState("Найдите соперника")
    const [searchData, setSearchData] = useState({
        username: ''
    })
    const changeHandler = (event: any) => {
        if (event.target.value) {
            setSearchData({
                ...searchData,
                username: event.target.value,
            })
            fetchUsersSearch(searchData)
        }
    }

    const [open, setOpen] = useState(false)
    const [btnText, setBtnText] = useState('Заполнить данные о сыгранной игре')

    if (loading) return <Loader/>

    const openNewGamePlace = () => {
        if (open) {
            setOpen(false)
            return setBtnText('Заполнить данные о сыгранной игре')
        }
        setOpen(true)
        return setBtnText('Закрыть')
    }

    const changeRival = (user: UserEntity) => {
        setRival(user.username)
    }
    return (
        <div className="container">
            <div className="default_btn" onClick={openNewGamePlace}>
                {btnText}
            </div>
            {/*New game*/}
            {
                open &&
                <>
                    <div className="user_new_game_place">
                        <div className="user_new_game__item">
                            Real Madrid {user?.username}
                        </div>
                        <div className="user_new_game__item">
                            vs
                        </div>
                        <div className="user_new_game__item">
                            <span>{rival}</span>
                            <input className="default_input" onChange={changeHandler} value={searchData.username}/>
                            <div className="users_search_items">
                                {
                                    !searchLoading && users.length ? users.map(user => {
                                            return (
                                                <div className="user_search_item" key={user.id} onClick={() => changeRival(user)}>
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
                                <input className="score_input" type="number"/>
                                <span>:</span>
                                <input className="score_input" type="number"/>
                            </div>
                        </div>
                        <div className="user_new_game__item"/>
                    </div>
                </>
            }
            {/*UserData*/}
            <div className="user_data_place">
                <div className="heading">
                    {user?.username} ({user?.rating})
                </div>
            </div>
            {user && user?.games.length ? user?.games.map(game => {
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

