import React from "react";

import { useAppDispatch, useAppSelector } from '@app/Store/hooks';

import { Notification, NotificationManager, NotificationType } from '@entities/Notification'


interface NotificationListProps {
    
}
 
const NotificationList: React.FunctionComponent<NotificationListProps> = () => {
    /**
     * Store
     */
    const notificationList = useAppSelector((state) => state.notification.list);

    // React.useCallback(
    const renderNotification = (notification: NotificationType, index: number) => {
        return <Notification
            key={`${notification.id}-${index}-notify`}
            id={notification.id!}

            {...{
                ...notification
            }}

        />
    }
    // [])

    
    return (
        <div className="notification-list">
            {notificationList.map(renderNotification)}
        </div>
    );
}
 
export default NotificationList;