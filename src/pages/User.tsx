import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useParams} from "react-router-dom"

interface UserParams{
    id: string | undefined
}
export const User: FC = () => {
    console.log(useParams())
    // @ts-ignore
    const {id}:UserParams = useParams()
    useEffect(() => {
        document.title = "Пользователь"
        fetchUsers({id})
    }, [])
    const {fetchUsers} = useActions()
    return (
        <div>

        </div>
    );
};

