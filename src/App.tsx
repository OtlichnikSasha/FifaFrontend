import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './router'
import {Header} from "./components/block/header";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useActions} from "./hooks/useActions";
const routes = Routes()
function App() {
    // const {user, status, loading, error} = useTypedSelector(state => state.user)
    // console.log('user', user)
    // if(loading){
    //     return <div>Идёт загрузка</div>
    // }
    //
    // const {fetchUser} = useActions()
    //
    // useEffect(() => {
    //     fetchUser()
    // }, [])

    return (
        <Router>
            <Header/>
            {routes}
        </Router>
    );
}

export default App;
