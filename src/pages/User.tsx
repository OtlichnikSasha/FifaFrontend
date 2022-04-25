import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {Link, useParams} from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Loader} from "../components/block/loader";
import {GamesList} from "../components/gamesList";

interface UserParams {
    id: string | undefined
}

export const User: FC = () => {
    let page = 0;
    const size = 20;
    // @ts-ignore
    const {id}: UserParams = useParams()
    useEffect(() => {
        document.title = "Пользователь"
        fetchUser({id})
        // @ts-ignore
        fetchGamesForUser({id, page, size})
    }, [id])
    const {fetchUser, fetchGamesForUser} = useActions()
    const {user, loading} = useTypedSelector(state => state.user)
    const {games} = useTypedSelector(state => state.games)
    const gamesLoading = useTypedSelector(state => state.games.loading)
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

