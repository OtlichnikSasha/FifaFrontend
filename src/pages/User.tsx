import React, {FC, useEffect} from 'react';

export const User: FC = () => {
    useEffect(() => {
        document.title = "Пользователь"
    }, [])
    return (
        <div>

        </div>
    );
};

