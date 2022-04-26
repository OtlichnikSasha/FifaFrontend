import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Loader} from "./block/loader";
import {UserCard} from "./userCard";

export const UsersList: FC = () => {
    const {users, loading} = useTypedSelector(state => state.users)
    if (loading) return <Loader/>
    return (
        <>
            {
                users.length ? users.map((user, i) => {
                        return (<UserCard i={i} user={user} key={user.id}/>)
                    })
                    :
                    <>Пусто!</>
            }
        </>
    );
};

