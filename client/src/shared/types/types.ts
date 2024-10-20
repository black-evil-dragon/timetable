// {
//     "id": 0,
//     "slot": 0,
//     "data": {
//         "hasSubGroup": false,
//         "subGroup": 0,
//         "title": "Дисциплина-Название 1",
//         "teacher": "Доц. Преподаватель-Имя",
//         "cabinet": "100 к.4"
//     }
// },
// {
//     "id": 1,
//     "slot": 2,
//     "data": {
//         "hasSubGroup": false,
//         "subGroup": 0,
//         "title": "Дисциплина-Название 2",
//         "teacher": "Доц. Преподаватель-Имя",
//         "cabinet": "100 к.4"
//     }
// },
// {
//     "id": 2,
//     "slot": 3,
//     "data": {
//         "hasSubGroup": false,
//         "subGroup": 0,
//         "title": "Дисциплина-Название 3",
//         "teacher": "Доц. Преподаватель-Имя",
//         "cabinet": "100 к.4"
//     }
// },
export const data = {
    "groups": [
        {
            "title": "4Б09 РПС-21",
            "slot": 0,
            "slots": [
                {
                    "id": 0,
                    "slot": 0,
                    "weekdayID": 0,
                    "weekdayTitle": "Понедельник",
                    "slots": []
                }
            ]
        },
        {
            "title": "4Б09 ПИБ-21",
            "slot": 1,
            "slots": [],
        }
    ],

    "schedule": [
        {
            "id": 0,
            "title": "Понедельник",
            "slot": 0,
            "slots": [
                {
                    "slot": 0,
                    "start": "08:00",
                    "end": "09:30"
                },
                {
                    "slot": 1,
                    "start": "09:40",
                    "end": "11:10"
                },
                {
                    "slot": 2,
                    "start": "11:40",
                    "end": "13:10"
                },
                {
                    "slot": 3,
                    "start": "13:20",
                    "end": "14:50"
                }
            ]
        },
        {
            "id": 1,
            "title": "Вторник",
            "slot": 1,
            "slots": [
                {
                    "slot": 0,
                    "start": "08:00",
                    "end": "09:30"
                },
                {
                    "slot": 1,
                    "start": "09:40",
                    "end": "11:10"
                },
                {
                    "slot": 2,
                    "start": "11:40",
                    "end": "13:10"
                },
                {
                    "slot": 3,
                    "start": "13:20",
                    "end": "14:50"
                }
            ]
        },
        {
            "id": 2,
            "title": "Среда",
            "slot": 2,
            "slots": [
                {
                    "slot": 0,
                    "start": "08:00",
                    "end": "09:30"
                },
                {
                    "slot": 1,
                    "start": "09:40",
                    "end": "11:10"
                },
                {
                    "slot": 2,
                    "start": "11:40",
                    "end": "13:10"
                },
                {
                    "slot": 3,
                    "start": "13:20",
                    "end": "14:50"
                }
            ]
        },
        {
            "id": 3,
            "title": "Четверг",
            "slot": 3,
            "slots": [
                {
                    "slot": 0,
                    "start": "08:00",
                    "end": "09:30"
                },
                {
                    "slot": 1,
                    "start": "09:40",
                    "end": "11:10"
                },
                {
                    "slot": 2,
                    "start": "11:40",
                    "end": "13:10"
                },
                {
                    "slot": 3,
                    "start": "13:20",
                    "end": "14:50"
                }
            ]
        },
    ]
}

// 
export type manageItemContentType = (itemPosition: PositionSlotType, action: string) => void

export type GroupType = {
    title: string;
    slot: number;
    slots: DaySlotType[];
}

export type DaySlotType = {
    id: number;
    weekdayTitle: string;
    weekdayID: number;
    slot: number;
    slots: ItemSlotType[];
}

export type ItemSlotType = {
    id: number | string;
    slot: number;
    data: ItemDataType | null;
}

export type ItemDataType = {
    title: string;

    hasSubGroup: boolean;
    subGroup: number;

    teacher: string;
    cabinet: string;
}


export type ScheduleType = {
    id: number;
    title: string;
    slot: number;
    slots: TimeSlotType[];
}
export type TimeSlotType = {
    slot: number;
    start: string;
    end: string;
}

export type PositionSlotType = {
    groupSlot: number,
    daySlot: number,
    timeSlot: number | null,
}











