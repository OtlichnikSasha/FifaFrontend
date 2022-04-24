import React, {FC} from 'react';

interface EmptyProps {
    loading: boolean,
    label: string
}

export const Empty: FC<EmptyProps> = ({loading, label}) => {
    return (
        <>
            {
                !loading ?
                    <div>{label}</div>
                    :
                <></>
            }
        </>
    );
};

