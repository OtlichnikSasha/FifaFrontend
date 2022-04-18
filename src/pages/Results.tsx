import React, {FC, useEffect} from 'react';
import {GamesList} from "../components/gamesList";
import {useActions} from "../hooks/useActions";

export const Results: FC = () => {
    useEffect(() => {
        document.title = "Результаты матчей"
        fetchGames({})
    }, [])
    const {fetchGames} = useActions()
    return (
        <div className="container">
            <h1>Результаты матчей</h1>
            <GamesList/>
        </div>
    );
};

