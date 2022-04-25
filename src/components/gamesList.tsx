import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Link} from "react-router-dom";
import {Empty} from "./block/empty";

export const GamesList: FC = () => {
    const {games, loading} = useTypedSelector(state => state.games)
    return (
        <>
            {!loading && games.length ? games.map(game => {
                    return (
                        <div className="games_card" key={game.id}>
                            <div className="games_card__teams_place">
                                <Link to={`/user/${game.creatorId === game.players[0].id ? game.players[0].id : game.players[1].id}`}
                                    className={game.scoreOne > game.scoreTwo ? "games_card__data winner" : "games_card__data"}>
                                    {game.creatorId === game.players[0].id ? game.players[0].username : game.players[1].username}
                                </Link>
                                <Link to={`/user/${game.creatorId !== game.players[0].id ? game.players[0].id : game.players[1].id}`}
                                    className={game.scoreOne < game.scoreTwo ? "games_card__data winner" : "games_card__data"}>
                                    {game.creatorId !== game.players[0].id ? game.players[0].username : game.players[1].username}
                                </Link>
                            </div>
                            <div className="games_card__score_place">
                                <div className={game.scoreOne > game.scoreTwo ? "games_card__data winner" : "games_card__data"}>
                                    {game.scoreOne}
                                </div>
                                <div className={game.scoreOne < game.scoreTwo ? "games_card__data winner" : "games_card__data"}>
                                    {game.scoreTwo}
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <Empty label="Информации об играх пока нет" loading={loading}/>
            }
            {/*{loading && <div className="preloader_text"/> }*/}
        </>
    );
};

