import { configureStore } from '@reduxjs/toolkit';

import { timetableReducer } from '@features/TimetableCreate';


export const store = configureStore({
    reducer: {
        timetable: timetableReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;