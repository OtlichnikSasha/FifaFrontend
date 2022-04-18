import React, {FC} from 'react';
import {Loader} from "./block/loader";
import {useTypedSelector} from "../hooks/useTypedSelector";

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
                                <div
                                    className={game.score.split(":")[0] > game.score.split(":")[1] ? "games_card__data winner" : "games_card__data"}>
                                    {game.player1}
                                </div>
                                <div className={game.score.split(":")[1] > game.score.split(":")[0] ? "games_card__data winner" : "games_card__data"}>
                                    {game.player2}
                                </div>
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

