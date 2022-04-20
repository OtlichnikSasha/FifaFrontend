import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchUserCabinet} from "../store/reducers/userReducer";

export const Cabinet: FC = () => {
    useEffect(() => {
        document.title = "Личный кабинет"
        fetchUserCabinet()
    }, [])
    const {fetchUserCabinet} = useActions()
    const {user, status, loading, error} = useTypedSelector(state => state.user)
    return (
        <div className="container">

        </div>
    );
};

