import React, {FC, useCallback, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useParams} from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Loader} from "../components/block/loader";
import {GamesList} from "../components/gamesList";

interface UserParams {
    id: string | undefined
}

export const User: FC = () => {
    const [page, setPage] = useState(0)
    const [final, setFinal] = useState(false)
    const size = 20;
    // @ts-ignore
    const {id}: UserParams = useParams()
    const getUserAndGames = useCallback(() => {
        document.title = "Пользователь"
        fetchUser({id})
        // @ts-ignore
        fetchGamesForUser({id, page, size})
    }, [id])

    useEffect(() => {
        getUserAndGames()
    }, [getUserAndGames])

    const {fetchUser, fetchGamesForUser, fetchGamesOffsetForUser} = useActions()
    const [fetching, setFetching] = useState(false)
    const {user, loading} = useTypedSelector(state => state.user)
    const {totalElements} = useTypedSelector(state => state.games)
    const gamesLoading = useTypedSelector(state => state.games.loading)
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
        if (fetching && !gamesLoading && !final) {
            setPage(page+1)
            // @ts-ignore
            fetchGamesOffsetForUser({id, page, size})
            setFetching(false)
            if(totalElements < size) setFinal(true)
        }
    }, [fetching, gamesLoading])

    useEffect(() => {
        getGamesWithOffset()
    }, [getGamesWithOffset])

    if (loading) return <Loader/>
    return (
        <div className="container">
            <div className="user_data_place">
                <div className="heading">
                    {user?.username} {user?.nameSurname ? (user?.nameSurname) : ''} ({user?.rating})
                </div>
            </div>
            <GamesList/>
        </div>
    );
};

