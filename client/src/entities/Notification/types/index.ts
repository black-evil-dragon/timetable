export type AnimationType = 'enter' | 'visible' | 'close';

export enum NotificationAnimation {
    Enter = 'enter',
    Visible = 'visible',
    Close = 'close',
}

export type NotificationOptionsType = {
    text?: string

    animation?: AnimationType
    className?: string
    autoDelete?: {
        duration: number,
    } | false,
}

export type NotificationType = {
    id?: string
    title: string
} & NotificationOptionsType

export type NotificationUpdateType = {
    title?: string
    text?: string

    animation?: AnimationType
    className?: string
    autoDelete?: {
        duration: number,
    }
}