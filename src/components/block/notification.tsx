import React, {FC} from 'react';

interface PropsTypes {
    openNotification: boolean,
    frontendError: string,
    status: string
}

export const Notification: FC<PropsTypes> = ({openNotification, frontendError, status}) => {
    return (
        <div className={openNotification ? "notification _active" : "notification"}>
            {
                status ?
                    <div className={status === "error" ? "notification_data error" : "notification_data success"}>
                        <div className="notification_heading">
                            {status === "error" ? "Ошибка" : "Успешно"}
                        </div>
                        <div className="notification_text">
                            {frontendError}
                        </div>
                    </div>
                    :
                    <></>
            }

        </div>
    );
};

