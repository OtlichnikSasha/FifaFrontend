import React, {FC, useEffect} from 'react';

const Index: FC = () => {
    useEffect(() => {
        document.title = "Главная"
    }, [])
    return (
        <div>

        </div>
    );
};

export default Index;