import React, {FC, useEffect, useState, useCallback} from 'react';
import {GamesList} from "../components/gamesList";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Results: FC = () => {
    let page = 0;
    const size = 20;
    const [fetching, setFetching] = useState(false)
    useEffect(() => {
        document.title = "Результаты матчей"
        fetchGames({page, size})
    }, [])
    const {fetchGames, fetchGamesOffset} = useActions()
    const {loading} = useTypedSelector(state => state.games)
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [])
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setFetching(true)
        }
    }

    const getGamesWithOffset = useCallback(() => {
        if (!loading) {
            page += 1
            fetchGamesOffset({page, size})
        }
    }, [fetching])

    useEffect(() => {
        getGamesWithOffset()
    }, [getGamesWithOffset])

    return (
        <div className="container">
            <h1>Результаты матчей</h1>
            <GamesList/>
        </div>
    );
};

