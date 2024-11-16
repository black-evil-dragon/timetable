import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TimetableType } from '@pages/timetable';
import { PositionSlotType } from '@shared/types';
import { EditableField } from '@features/EditPanel';
import { TimeSlotType } from '../types';


interface TimetableState {
    timetables: TimetableType[];
    editItem: null | {
        position: PositionSlotType;
        target: string,
        editableFields: any[];
    };
}

const initialState: TimetableState = {
    timetables: [],
    editItem: null,
};

const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        setTimetables(state, action: PayloadAction<TimetableType[]>) {
            state.timetables = action.payload;
        },

        // Item
        moveItem(
            state,
            action: PayloadAction<{
                fromPosition: PositionSlotType;
                toPosition: PositionSlotType;
            }>
        ) {
            const { fromPosition, toPosition } = action.payload;
            const fromItem = state.timetables[fromPosition.timetableSlot].days[fromPosition.daySlot!].slots[fromPosition.timeSlot!];
            const toItem = state.timetables[toPosition.timetableSlot].days[toPosition.daySlot!].slots[toPosition.timeSlot!];

            state.timetables[fromPosition.timetableSlot].days[fromPosition.daySlot!].slots[fromPosition.timeSlot!] = toItem;
            state.timetables[toPosition.timetableSlot].days[toPosition.daySlot!].slots[toPosition.timeSlot!] = fromItem;
        },
        manageItemContent(
            state,
            action: PayloadAction<{ position: PositionSlotType; actionType: string }>
        ) {
            const { position, actionType } = action.payload;
            const item = state.timetables[position.timetableSlot].days[position.daySlot!].slots[position.timeSlot!];

            switch (actionType) {
                case 'create':
                    item.data = {
                        title: 'Название',
                        teacher: 'Организатор',
                        cabinet: 'Место',
                    };
                    break;
                case 'delete':
                    if (item.data) item.data = null;

                    break;
                case 'edit':
                    if (item.data) {
                        state.editItem = {
                            position: position,
                            target: 'item',
                            editableFields: [
                                { name: 'title', value: item.data.title },
                                { name: 'cabinet', value: item.data.cabinet },
                                { name: 'teacher', value: item.data.teacher },
                            ],
                        };
                    }
                    break;
                default:
                    break;
            }
        },
        updateItemContent(
            state,
            action: PayloadAction<{ fields: EditableField[]; position: PositionSlotType }>
        ) {
            const { fields, position } = action.payload;
            const item = state.timetables[position.timetableSlot].days[position.daySlot!].slots[position.timeSlot!];

            if (item && item.data) {
                fields.forEach((field) => {
                    item.data![field.name] = field.value;
                });
            }
            state.editItem = null;
        },

        // Time
        manageTimeContent(
            state,
            action: PayloadAction<{ position: PositionSlotType; actionType: string }>
        ) {
            const { position, actionType } = action.payload;

            let intervals = state.timetables[position.timetableSlot].intervals
            let time = intervals[position.timeSlot!]

            switch (actionType) {
                case 'create':

                    state.timetables[position.timetableSlot].intervals = [
                        ...intervals,
                        {
                            id: Math.random().toString(36).substring(2, 9),
                            slot: intervals.length,
                            start: '',
                            end: '',
                        }
                    ]

                    break;
                case 'edit':
                    state.editItem = {
                        position: position,
                        target: 'time',
                        editableFields: [
                            { name: 'start', value: time.start, type: 'time', placeholder: 'Начало', },
                            { name: 'end', value: time.end, type: 'time', placeholder: 'Конец', },
                        ],
                    };
                    break;
                case 'delete':
                    

                    if (intervals.length === 1) break;

                    state.timetables[position.timetableSlot].intervals = [
                        ...intervals.slice(0, position.timeSlot!),
                        ...intervals.slice(position.timeSlot! + 1),
                    ]

                    state.timetables[position.timetableSlot].days.forEach(day => {
                        let slots = day.slots
                        day.slots = [
                            ...slots.slice(0, position.timeSlot!),
                            ...slots.slice(position.timeSlot! + 1),
                        ]
                    })

                    break;
                default:
                    break;
            }
        },
        updateTimeContent(
            state,
            action: PayloadAction<{ fields: EditableField[]; position: PositionSlotType }>
        ) {
            const { fields, position } = action.payload;
            const time = state.timetables[position.timetableSlot].intervals[position.timeSlot!]

            fields.forEach((field) => {
                if (field.name === 'start') {
                    time.start = field.value;
                } else if (field.name === 'end') {
                    time.end = field.value;
                }
                
            });

            state.editItem = null;
        },
    },
});

export const {
    setTimetables,

    moveItem,
    manageItemContent,
    updateItemContent,

    manageTimeContent,
    updateTimeContent,

} = timetableSlice.actions;

export default timetableSlice.reducer;