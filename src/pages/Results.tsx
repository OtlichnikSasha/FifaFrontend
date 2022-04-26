import React, {FC, useEffect, useState, useCallback} from 'react';
import {GamesList} from "../components/gamesList";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Results: FC = () => {
    const [page, setPage] = useState(1)
    const [final, setFinal] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)
    const size = 20;
    const [fetching, setFetching] = useState(false)
    const getGames = useCallback(() => {
        document.title = "Результаты матчей"
        fetchGames({page: 0, size})
    }, [])

    useEffect(() => {
        getGames()
    }, [getGames])

    const {fetchGames, fetchGamesOffset} = useActions()
    const {loading, totalElements} = useTypedSelector(state => state.games)
    useEffect(() => {
        if (!final || !fetching) {
            document.addEventListener('scroll', scrollHandler)
            return function () {
                document.removeEventListener('scroll', scrollHandler)
            };
        }
    }, [])
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setFetching(true)
        }
    }

    const getGamesWithOffset = useCallback(() => {
        if (fetching && !loading && !final) {
            fetchGamesOffset({page, size})
            setFirstLoading(false)
        }
    }, [fetching])

    useEffect(() => {
        getGamesWithOffset()
    }, [getGamesWithOffset])


    const offsetGamesTrigger = useCallback(() => {
        if (!loading && !firstLoading) {
            if (totalElements < size) setFinal(true)
            else setFinal(false)
            setPage(page + 1)
            setFetching(false)
        }
    }, [totalElements])

    useEffect(() => {
        offsetGamesTrigger()
    }, [offsetGamesTrigger])

    return (
        <div className="container">
            <h1>Результаты матчей</h1>
            <GamesList/>
        </div>
    );
};

