import React, {FC, useEffect} from 'react';
import {UsersList} from "../components/usersList";
import {useActions} from "../hooks/useActions";

export const Index: FC = () => {
    useEffect(() => {
        document.title = "ТОП игроки"
        fetchUsers({})
    }, [])
    const {fetchUsers} = useActions()
    return (
        <div className="container">
            <h1>ТОП игроки</h1>
            <div className="heading_players_place">
                <div className="heading_players">
                    Место
                </div>
                <div className="heading_players">
                    Ник (Рейтинг)
                </div>
            </div>
            <div>
                <UsersList/>
            </div>
        </div>
    );
};

