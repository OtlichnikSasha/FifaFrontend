import React, {FC} from 'react';
import {Loader} from "./block/loader";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Link} from "react-router-dom";

export const GamesList: FC = () => {
    const {games, status, loading, error} = useTypedSelector(state => state.games)
    if (loading) {
        return <Loader/>
    }
    return (
        <>
            {games.length ? games.map(game => {
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
                <div>Информации об играх пока нет</div>
            }
        </>
    );
};

