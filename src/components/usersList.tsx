import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {UserCard} from "./userCard";
import {Empty} from "./block/empty";

export const UsersList: FC = () => {
    const {users, loading} = useTypedSelector(state => state.users)
    return (
        <>
            {
                users.length ? users.map((user, i) => {
                        return (<UserCard i={i} user={user} key={user.id}/>)
                    })
                    :
                    <Empty label="Информации об игроках пока нет" loading={loading}/>
            }
            {loading && <div className="preloader_text"/> }
        </>
    );
};

