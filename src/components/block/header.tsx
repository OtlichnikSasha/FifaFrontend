import React, {FC} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import logo from "../../static/img/logo.jpg"
export const Header: FC = () => {
    const {user, status, loading, error} = useTypedSelector(state => state.user)
    return (
        <header className="header">
            <div className="container">
                <div className="logo_place">
                    <Link to="/topPlayers">
                        <img src={logo} className="logo_img"/>
                    </Link>
                    <Link className="logo" to="/topPlayers">
                        <span>Fifa</span>
                        <span>Mobile</span>
                        <span>League</span>
                    </Link>
                    <div className="diagonal-line"/>
                </div>
                <nav className="nav">
                    <NavLink to="/results" className="nav_link">
                        Результаты матчей
                    </NavLink>
                    <NavLink to="/topPlayers" className="nav_link">
                        ТОП игроки
                    </NavLink>
                    <div className="diagonal-line"/>
                </nav>
                <div>
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

                </div>
            </div>
        </header>
    );
};

