export const data = {
    "groups": [
        {
            "title": "4Б09 РПС-21",
            "slot": 0,
            "schedule": [
                {
                    "id": 0,
                    "slot": 0,
                    "weekdayID": 0,
                    "weekday": "Понедельник",
                    "subjects": [
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
                    ]
                }
            ]
        },
        {
            "title": "4Б09 ПИБ-21",
            "slot": 1,
            "schedule": [],
        }
    ],

    "schedule": [
        {
            "id": 0,
            "weekday": "Понедельник",
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
            "weekday": "Вторник",
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
            "weekday": "Среда",
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
            "weekday": "Четверг",
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
export type manageItemContentType = (itemPosition: PositionItemType, action: string) => void

export type GroupType = {
    title: string;
    slot: number;
    schedule: ScheduleItemType[];
}

export type ScheduleItemType = {
    id: number;
    weekday: string;
    weekdayID: number;
    slot: number;
    subjects: SubjectType[];
}

export type SubjectType = {
    id: number | string;
    slot: number;
    data: SubjectDataType | null;
}

export type SubjectDataType = {
    title: string;

    hasSubGroup: boolean;
    subGroup: number;

    teacher: string;
    cabinet: string;
}


export type ScheduleType = {
    id: number;
    weekday: string;
    slot: number;
    slots: SlotType[];
}
export type SlotType = {
    slot: number;
    start: string;
    end: string;
}

export type PositionItemType = {
    groupIndex: number,
    scheduleIndex: number,
    slotIndex: number,
}











