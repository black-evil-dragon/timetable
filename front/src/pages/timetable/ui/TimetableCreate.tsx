import React from "react";
import Subject from "./Subject";

interface TimetableCreateProps {

}

const data = {
    "groups": [
        {
            "title": "4Б09 РПС-21",
            "schedule": [
                {
                    "id": 0,
                    "day": "Понедельник",
                    "subjects": [
                        {
                            "position": 0,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                        null,
                        {
                            "position": 2,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                        {
                            "position": 3,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        }
                    ]
                }
            ]
        },
        {
            "title": "4Б09 ПИБ-21",
            "schedule": [
                {
                    "id": 0,
                    "day": "Понедельник",
                    "subjects": [
                        {
                            "position": 0,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                        null,
                        null,
                        {
                            "position": 3,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                    ]
                },
                {
                    "id": 1,
                    "day": "Вторник",
                    "subjects": [
                        {
                            "position": 0,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                        null,
                        null,
                        {
                            "position": 3,
                            "hasSubGroup": false,
                            "subGroup": 0,
                            "title": "Дисциплина-Название",
                            "teacher": "Доц. Преподаватель-Имя",
                            "cabinet": "100 к.4"
                        },
                    ]
                }
            ]
        }
    ],

    "schedule": [
        {
            "weekday": "Понедельник",
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
            "weekday": "Вторник",
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
        }
    ]
}

const TimetableCreate: React.FunctionComponent<TimetableCreateProps> = () => {


    const updateSlots = () => {
        const data = []
    }


    React.useEffect(() => {

    }, [])

    return (
        <>
            <div className="timetable">
                {
                    data.schedule.map((scheduleItem: any, scheduleIndex: any) => <>
                        <div className="timetable__day">
                            <div className="timetable__row --system">
                                <span className="day">{scheduleItem.weekday}</span>
                            </div>
                            <div className="timetable__row --system">
                                <div className="timetable__items --times">
                                    {
                                        scheduleItem.slots.map((slotItem: any, slotIndex: any) => <>
                                            <div className="item --times">
                                                <span className="time">{slotItem.start}</span>
                                                <span className="time">-</span>
                                                <span className="time">{slotItem.end}</span>
                                            </div>
                                        </>)
                                    }
                                </div>
                            </div>
                            {
                                data.groups.map((groupItem: any, groupIndex: any) => <>
                                    <div className="timetable__row">
                                        <div className="timetable__items">
                                            {
                                                groupItem.schedule[scheduleIndex] ? groupItem.schedule[scheduleIndex].subjects.map((subjectItem: any, subjectIndex: any) => <>
                                                    <div className="item">
                                                        {subjectItem ? <Subject {...subjectItem} /> : <div className="subject --null"></div>}
                                                    </div>
                                                </>)
                                                :
                                                scheduleItem.slots.map(() => <div className="item"><div className="subject --null"></div></div>)
                                            }
                                        </div>
                                    </div>
                                </>)
                            }
                        </div>
                    </>)
                }
            </div>
        </>
    );
}

export default TimetableCreate;