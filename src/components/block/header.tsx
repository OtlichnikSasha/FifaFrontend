import React, {FC, useContext, useRef} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../../static/img/logo.jpg"
import {AuthContext} from "../../context/AuthContext";

export const Header: FC = () => {
    const nav = useRef(null)
    const mobile_menu = useRef(null)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const openMobileMenu = () => {
        // @ts-ignore
        mobile_menu.current.classList.toggle("_active")
        // @ts-ignore
        nav.current.classList.toggle("open")
        document.body.classList.toggle("hidden")
    }
    const closeMenu = () => {
        // @ts-ignore
        mobile_menu.current.classList.toggle("_active")
        // @ts-ignore
        nav.current.classList.toggle("open")
        document.body.classList.toggle("hidden")
    }

    const exit = async () => {
        auth.logout()
        navigate('/topPlayers')
    };
    return (
        <header className="header">
            <div className="container">
                <div className="logo_place">
                    <Link to="/topPlayers" onClick={closeMenu}>
                        <img src={logo} className="logo_img" alt="Fifa Mobile League"/>
                    </Link>
                    <Link className="logo" to="/topPlayers">
                        <span>Fifa</span>
                        <span>Mobile</span>
                        <span>League</span>
                    </Link>
                </div>
                <nav className="nav" ref={nav}>
                    <div className="diagonal-line"/>
                    <NavLink to="/results" className="nav_link" onClick={closeMenu}>
                        Результаты матчей
                    </NavLink>
                    <NavLink to="/topPlayers" className="nav_link" onClick={closeMenu}>
                        ТОП игроки
                    </NavLink>
                    <div className="diagonal-line"/>
                    <div className="right_nav">
                        {
                            auth.isAuthenticated ?
                                <>
                                    <NavLink to="/cabinet" className="nav_link" onClick={closeMenu}>
                                        Кабинет
                                    </NavLink>
                                    <div className="nav_link" onClick={exit}>
                                        Выйти
                                    </div>
                                </>
                                :
                                <>
                                    <NavLink to="user/sign_in" className="nav_link" onClick={closeMenu}>
                                        Вход
                                    </NavLink>
                                    <NavLink to="user/sign_up" className="nav_link" onClick={closeMenu}>
                                        Регистрация
                                    </NavLink>
                                </>
                        }

                    </div>
                </nav>
                <div className="mobile_menu_place" onClick={openMobileMenu} ref={mobile_menu}>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
        </header>
    );
};

