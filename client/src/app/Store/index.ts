import { configureStore } from '@reduxjs/toolkit';

import { timetableReducer } from '@features/TimetableCreate';

import { NotificationReducer } from '@entities/Notification';
import { UserReducer } from '@entities/User';


export const store = configureStore({
    reducer: {

        user: UserReducer,

        timetable: timetableReducer,
        notification: NotificationReducer,


    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;