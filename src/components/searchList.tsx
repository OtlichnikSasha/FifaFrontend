import React, {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";

interface SearchListProps {
    changeRival: any
}

export const SearchList: FC<SearchListProps> = ({changeRival}) => {
    const {users, loading} = useTypedSelector(state => state.usersSearch)
    const {user} = useTypedSelector(state => state.user)
    return (
        <div className="users_search_items">
            {
                !loading && users.length ? users.map(searchUser => {
                        return (
                            <div key={searchUser?.id}>
                                {
                                    searchUser.id !== user?.id ?
                                        <div className="user_search_item"
                                             onClick={() => changeRival(searchUser)}>
                                            {searchUser?.username}
                                        </div>
                                        :
                                        <></>
                                }
                            </div>

                        )
                    })
                    :
                    <></>
            }
        </div>
    );
};

