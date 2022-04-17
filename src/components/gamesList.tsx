import React, {FC} from 'react';
import {Loader} from "./block/loader";
import {useTypedSelector} from "../hooks/useTypedSelector";

const GamesList: FC = () => {
    const {games, status, loading, error} = useTypedSelector(state => state.games)
    if (loading) {
        return <Loader/>
    }
    return (
        <div>

        </div>
    );
};

