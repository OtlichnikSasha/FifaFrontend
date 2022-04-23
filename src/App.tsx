import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRouter} from './router'
import {Header} from "./components/block/header";
import {useAuth} from "./hooks/auth_hook";
import {AuthContext} from './context/AuthContext'
function App() {
    const {token, login, playerId, logout, username} = useAuth()
    const isAuthenticated = !!token
    const routes = useRouter(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, player_id : playerId, logout, username, isAuthenticated
        }}>
        <Router>
            <Header/>
            {routes}
        </Router>
        </AuthContext.Provider>
    );
}

export default App;
