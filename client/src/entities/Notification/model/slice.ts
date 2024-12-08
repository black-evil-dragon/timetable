import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotificationAnimation, NotificationOptionsType, NotificationType, NotificationUpdateType } from '..';


interface NotificationState {
    list: NotificationType[],
}

const initialState: NotificationState = {
    list: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(
            state,
            action: PayloadAction<NotificationType[]>
        ) {
            state.list = action.payload;
        },

        add(
            state,
            action: PayloadAction<{ title: string, options?: NotificationOptionsType }>
        ) {
            const { title, options } = action.payload;
            const notification: NotificationType = {
                id: Math.random().toString(36).substring(2, 9),

                title: title,
                animation: NotificationAnimation.Enter,
                autoDelete: false,

                ...options,
            }

            state.list.push(notification)
        },

        update(
            state,
            action: PayloadAction<{id: string, update: NotificationUpdateType}>
        ) {
            const { id } = action.payload;
            const index = state.list.findIndex((notification) => notification.id === id)

            const notification = state.list[index]

            state.list[index] = {
                ...notification,
                ...action.payload.update,
            }
        },

        remove(
            state,
            action: PayloadAction<{id: string}>
        ) {
            const { id } = action.payload;

            state.list = state.list.filter((notification) => notification.id !== id)

        },
    },
});

export const {
    set,

    add,
    update,
    remove,

} = notificationSlice.actions;

export default notificationSlice.reducer