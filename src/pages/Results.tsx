import React, {FC, useEffect, useState, useCallback} from 'react';
import {GamesList} from "../components/gamesList";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Results: FC = () => {
    const [page, setPage] = useState(0)
    const [final, setFinal] = useState(false)
    const size = 20;
    const [fetching, setFetching] = useState(false)
    const getGames = useCallback(() => {
        document.title = "Результаты матчей"
        fetchGames({page, size})
    }, [])

    useEffect(() => {
        getGames()
    }, [getGames])


    const {fetchGames, fetchGamesOffset} = useActions()
    const {loading, totalElements} = useTypedSelector(state => state.games)
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [])
    const scrollHandler = (e: any) => {
        if (!final && e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setFetching(true)
        }
    }

    const getGamesWithOffset = useCallback(() => {
        if (fetching && !loading && !final) {
            setPage(page+1)
            fetchGamesOffset({page, size})
            setFetching(false)
            if(totalElements < size) setFinal(true)
        }
    }, [fetching, loading])

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

