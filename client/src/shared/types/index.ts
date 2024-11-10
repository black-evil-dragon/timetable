export * from './context-menu'
export * from './types'


export const data = {
    "timetables": [
        {
            "id": Math.random().toString(36).substring(2, 9),
            "title": "4Б09 РПС-21",
            "slot": 0,
            "days": [
                // {
                //     // "id": Math.random().toString(36).substring(2, 9),
                //     // "weekdayID": Math.random().toString(36).substring(2, 9),

                //     "title": "Понедельник",
                //     "slot": 0,
                //     "slots": [
                //         {
                //             "id": Math.random().toString(36).substring(2, 9),
                //             "slot": 0,
                //             "data": {
                //                 "title": "Название",
                //                 "teacher": "Организатор",
                //                 "cabinet": "Место",
                //             },
                //         },
                //     ]
                // }
            ],
            "intervals": [
                {
                    "id": Math.random().toString(36).substring(2, 9),
                    "slot": 0,
                    "start": "08:00",
                    "end": "09:30"
                },
                {
                    "id": Math.random().toString(36).substring(2, 9),
                    "slot": 1,
                    "start": "09:40",
                    "end": "11:10"
                },
                {
                    "id": Math.random().toString(36).substring(2, 9),
                    "slot": 2,
                    "start": "11:40",
                    "end": "13:10"
                },
                {
                    "id": Math.random().toString(36).substring(2, 9),
                    "slot": 3,
                    "start": "13:20",
                    "end": "14:50"
                }
            ]
        },
    ],
}