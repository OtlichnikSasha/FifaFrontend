import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useParams} from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";

interface UserParams {
    id: string | undefined
}

export const User: FC = () => {
    console.log(useParams())
    // @ts-ignore
    const {id}: UserParams = useParams()
    useEffect(() => {
        document.title = "Пользователь"
        fetchUser({id})
    }, [])
    const {fetchUser} = useActions()
    const {users, status, loading, error} = useTypedSelector(state => state.users)
    return (
        <div className="container">
            <div className="user_data_place">

            </div>
        </div>
    );
}
    ;

