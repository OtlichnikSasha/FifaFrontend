import React, {FC} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export const Header: FC = () => {
    const {user, status, loading, error} = useTypedSelector(state => state.user)
    return (
        <header className="header">
            <div className="container">
                <Link className="logo" to="/topPlayers">
                    Logo
                </Link>
                <nav className="nav">
                    <NavLink to="/results" className="nav_link">
                        Результаты матчей
                    </NavLink>
                    <NavLink to="/topPlayers" className="nav_link">
                        ТОП игроки
                    </NavLink>
                    {
                        user ?
                            <NavLink to="/cabinet" className="nav_link">
                                Кабинет
                            </NavLink>
                            :
                            <>
                                <NavLink to="/user/sign_in" className="nav_link">
                                    Вход
                                </NavLink>
                                <NavLink to="/user/sign_up" className="nav_link">
                                    Регистрация
                                </NavLink>
                            </>
                    }

                </nav>
            </div>
        </header>
    );
};

