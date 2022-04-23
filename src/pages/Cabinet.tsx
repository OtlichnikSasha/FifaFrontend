import React, {FC, useContext, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchEditUser, fetchUserCabinet} from "../store/reducers/userReducer";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/block/loader";
import {UserEntity} from "../types";

export const Cabinet: FC = () => {
    const {fetchUserCabinet, fetchUsersSearch, fetchEditUser} = useActions()
    const {user, loading} = useTypedSelector(state => state.user)
    const {users} = useTypedSelector(state => state.usersSearch)
    const searchLoading = useTypedSelector(state => state.usersSearch.loading)
    const {token, player_id} = useContext(AuthContext)
    useEffect(() => {
        document.title = "Личный кабинет"
        fetchUserCabinet({token})
    }, [])
    // @ts-ignore
    const [rival, setRival] = useState<UserEntity>({})
    const [searchData, setSearchData] = useState({
        username: '',
        token: token
    })
    const [userData, setUserData] = useState({
        id: player_id,
        nameSurname: '',
        token: token
    })
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
        setRival(user)
    }

    const addNameSurname = (event: any) => {
        setUserData({
            ...userData,
            nameSurname: event.target.value
        })
    }

    const editUser = () => {
        if(userData.nameSurname){
            fetchEditUser(userData)
        }
    }

    const addMatch = () => {
        if(rival){

        }
    }
    return (
        <div className="container">
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
            {
                open &&
                <>
                    <div className="user_new_game_place">
                        <div className="user_new_game__item">
                            {user?.username}
                            {user?.nameSurname && (user?.nameSurname)} ({user?.rating})
                        </div>
                        <div className="user_new_game__item">
                            vs
                        </div>
                        <div className="user_new_game__item">
                            <span>
                                {rival?.username} {rival?.nameSurname && (rival?.nameSurname)} ({rival?.rating})
                            </span>
                            <input className="default_input" onChange={changeHandler} value={searchData.username}/>
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
                                <input className="score_input" type="number"/>
                                <span>:</span>
                                <input className="score_input" type="number"/>
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
            }
            {/*UserData*/}
            <div className="user_data_place">
                <div className="heading">
                    {user?.username} {user?.nameSurname && (user?.nameSurname)} ({user?.rating})
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

