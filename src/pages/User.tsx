import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {Link, useParams} from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Loader} from "../components/block/loader";

interface UserParams {
    id: string | undefined
}

export const User: FC = () => {
    console.log(useParams())
    // @ts-ignore
    const {id}: UserParams = useParams()
    useEffect(() => {
        document.title = "Пользователь"
        fetchUser({id})
    }, [])
    const {fetchUser} = useActions()
    const {user, status, loading, error} = useTypedSelector(state => state.user)
    if (loading) {
        return <Loader/>
    }
    return (
        <div className="container">
            <div className="user_data_place">
                <div className="heading">
                    {user && user?.username} {user && user?.nameSurname ? (user?.nameSurname) : ''} ({user && user?.rating})
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
                                <div className={game.score.split(":")[0] > game.score.split(":")[1] ? "games_card__data winner" : "games_card__data"}>
                                    {game.score.split(":")[0]}
                                </div>
                                <div className={game.score.split(":")[1] > game.score.split(":")[0] ? "games_card__data winner" : "games_card__data"}>
                                    {game.score.split(":")[1]}
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div>Пользователь пока не играл матчей.</div>
            }
        </div>
    );
};

