import React, {FC, useEffect} from 'react';
import {UsersList} from "../components/usersList";

export const Index: FC = () => {
    useEffect(() => {
        document.title = "ТОП игроки"
    }, [])
    return (
        <div className="container">
            <div className="heading_players_place">
                <div className="heading_players">
                    Место
                </div>
                <div className="heading_players">
                    Ник
                </div>
                <div className="heading_players">
                    Рейтинг
                </div>
            </div>
            <div>
                <UsersList/>
            </div>
        </div>
    );
};

