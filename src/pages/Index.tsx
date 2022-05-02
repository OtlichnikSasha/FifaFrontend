import React, {FC, useCallback, useEffect, useState} from 'react';
import {UsersList} from "../components/usersList";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Index: FC = () => {
    const [page, setPage] = useState(1)
    const [final, setFinal] = useState(false)
    const size = 20;
    const [fetching, setFetching] = useState(false)
    const {fetchUsers, fetchUsersOffset} = useActions()
    const {loading, totalElements} = useTypedSelector(state => state.users)
    const getPlayers = useCallback(() => {
        document.title = "ТОП игроки"
        fetchUsers({page: 0, size})
    }, [])

    useEffect(() => {
        getPlayers()
    }, [getPlayers])


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

    const getPlayersWithOffset = useCallback(() => {
        if (fetching && !loading && !final) {
            fetchUsersOffset({page, size})
            setPage(page + 1)
        }
    }, [fetching])

    useEffect(() => {
        getPlayersWithOffset()
    }, [getPlayersWithOffset])


    const offsetPlayersTrigger = useCallback(() => {
        if (!loading) {
            if (totalElements < size) setFinal(true)
            else setFinal(false)
            setFetching(false)
        }
    }, [totalElements, loading])

    useEffect(() => {
        offsetPlayersTrigger()
    }, [offsetPlayersTrigger])


    return (
        <div className="container">
            <h1>ТОП игроки</h1>
            <div className="heading_players_place">
                <div className="heading_players">
                    Место
                </div>
                <div className="heading_players">
                    Ник (Рейтинг)
                </div>
            </div>
            <div>
                <UsersList/>
            </div>
        </div>
    );
};

