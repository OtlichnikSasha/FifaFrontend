import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {UserEntity} from "../types";

interface PropsTypes {
    i: number,
    user: UserEntity
}

export const UserCard: FC<PropsTypes> = ({i, user}) => {

    return (
        <>
            {
                i + 1 === 1 && <Link
                    className="data_players_place gold"
                    to={`/user/${user.id}`}
                >
                    <div className="heading_players">
                        🥇
                    </div>
                    <div className="heading_players">
                        {user.username} ({user.rating})
                    </div>
                </Link>
            }
            {
                i + 1 === 2 && <Link
                    className="data_players_place silver"
                    to={`/user/${user.id}`}
                >
                    <div className="heading_players">
                        🥈
                    </div>
                    <div className="heading_players">
                        {user.username} ({user.rating})
                    </div>
                </Link>
            }
            {
                i + 1 === 3 && <Link
                    className="data_players_place bronze"
                    to={`/user/${user.id}`}
                >
                    <div className="heading_players">
                        🥉
                    </div>
                    <div className="heading_players">
                        {user.username} ({user.rating})
                    </div>
                </Link>
            }
            {
                i + 1 > 3 &&
                <Link
                    className="data_players_place"
                    to={`/user/${user.id}`}
                >
                    <div className="heading_players">
                        {i + 1}
                    </div>
                    <div className="heading_players">
                        {user.username} ({user.rating})
                    </div>
                </Link>
            }
        </>
    )
        ;
};

