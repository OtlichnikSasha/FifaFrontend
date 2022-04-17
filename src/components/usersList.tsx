import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Link} from "react-router-dom";
import {Loader} from "./block/loader";

export const UsersList: FC = () => {
    const {users, status, loading, error} = useTypedSelector(state => state.users)

    if (loading) {
        return <Loader/>
    }
    return (
        <div className="">
            {
                users.length ? users.map((user, i) => {
                        return (
                            <Link key={user.id} className="heading_players_place" to={`/user/${user.id}`}>
                                <div className="heading_players">
                                    {i + 1}
                                </div>
                                <div className="heading_players">
                                    {user.username}
                                </div>
                                <div className="heading_players">
                                    {user.rating}
                                </div>
                            </Link>
                        )
                    })
                    :
                    <>Пусто!</>
            }
        </div>
    );
};

