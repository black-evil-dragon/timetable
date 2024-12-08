import React from 'react';

import { useAppDispatch, useAppSelector } from '@app/Store/hooks';

import { NotificationAnimation, NotificationOptionsType, NotificationType } from '..';
import { NotificationManager } from '..'


import './notification.scss'

const selfClassName = 'notification'
const animationDelay = 250


type NotificationProps = {
    id: string,
    title: string,
} & NotificationOptionsType


const Notification = ({
    id,
    title,

    className='app-notification',
    text='',
    animation,

    autoDelete,

}: NotificationProps) => {

    const dispatch = useAppDispatch();

    const [isOpen, setOpen] = React.useState(animation === NotificationAnimation.Visible ? true : false)
    const [isClose, setClose] = React.useState(false)

    const closeNotification = () => {
        setClose(true)
        setTimeout(() => {
            dispatch(NotificationManager.remove({
                id,
            }))
        }, animationDelay)
    }

    const setAnimation = () => {
        switch(animation) {
            case NotificationAnimation.Enter:
                setTimeout(() => {
                    setOpen(true)
                    dispatch(NotificationManager.update({
                        id,
                        update: {
                            animation: NotificationAnimation.Visible
                        }
                    }))
                }, animationDelay);
                break;

        
            case NotificationAnimation.Visible:
                setOpen(true)
                break;

            case NotificationAnimation.Close:
                closeNotification()
                break;
    
            default:
                break;
        }

        autoDelete && setTimeout(() => {
            closeNotification()
        }, autoDelete.duration)
    }


    React.useEffect(() => {
        setAnimation()
    })

    return (
        <div className={`${className} ${selfClassName} ${isOpen ? '--open ' : ''}${isClose ? '--close ' : ''}`}>
            <div className={`${selfClassName}__content ${className}__content`}>
                <div className={`${selfClassName}__title ${className}__title`}>
                    {title}
                </div>

                <div className={`${selfClassName}__text ${className}__text`}>
                    {text}
                </div>
            </div>
            <button className={`${selfClassName}__close ${className}__close`} onClick={closeNotification}>&times;</button>
        </div>
    );
}

export default Notification;
