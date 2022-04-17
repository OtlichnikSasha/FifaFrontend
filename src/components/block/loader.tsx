import React, {FC} from 'react';

export const Loader: FC = () => {
    return (
        <div className="preloader">
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

