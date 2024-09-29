import React from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import Item from "./Item";

interface TimetableCreateProps {

}
interface ISubjectData {
    hasSubGroup: boolean;
    subGroup: number;
    title: string;
    teacher: string;
    cabinet: string;
}

interface ISubject {
    id: number;
    data: ISubjectData | null;
}

interface IScheduleItem {
    id: number;
    day: string;
    subjects: ISubject[];
}

interface IGroup {
    title: string;
    schedule: IScheduleItem[];
}

interface ISlot {
    slot: number;
    start: string;
    end: string;
}

interface IWeekday {
    weekday: string;
    slots: ISlot[];
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
                            "id": 0,
                            "data": {
                                "hasSubGroup": false,
                                "subGroup": 0,
                                "title": "Дисциплина-Название 1",
                                "teacher": "Доц. Преподаватель-Имя",
                                "cabinet": "100 к.4"
                            }
                        },
                        {
                            "id": 1,
                            "data": null
                        },
                        {
                            "id": 2,
                            "data": {
                                "hasSubGroup": false,
                                "subGroup": 0,
                                "title": "Дисциплина-Название 2",
                                "teacher": "Доц. Преподаватель-Имя",
                                "cabinet": "100 к.4"
                            }
                        },
                        {
                            "id": 3,
                            "data": {
                                "hasSubGroup": false,
                                "subGroup": 0,
                                "title": "Дисциплина-Название 3",
                                "teacher": "Доц. Преподаватель-Имя",
                                "cabinet": "100 к.4"
                            }
                        },
                    ]
                }
            ]
        },
        {
            "title": "4Б09 ПИБ-21",
            "schedule": []
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

    const [groups, setGroups] = React.useState(data.groups)
    const [schedule, setSchedule] = React.useState(data.schedule)

    const moveSubject = (fromIndex: number, toIndex: number) => {
        const updatedGroups = [...groups];
        const fromSubject = updatedGroups[0].schedule[0].subjects[fromIndex];

        updatedGroups[0].schedule[0].subjects[fromIndex] = updatedGroups[0].schedule[0].subjects[toIndex];
        updatedGroups[0].schedule[0].subjects[toIndex] = fromSubject;

        setGroups(updatedGroups);
    };


    React.useEffect(() => {

    }, [])

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="timetable">
                    {
                        schedule.map((scheduleItem: any, scheduleIndex: number) => <>
                            <div className="timetable__day" key={scheduleIndex}>
                                <div className="timetable__row --system">
                                    <span className="day">{scheduleItem.weekday}</span>
                                </div>
                                <div className="timetable__row --system">
                                    <div className="timetable__items --times">
                                        {
                                            scheduleItem.slots.map((slotItem: any, slotIndex: number) => <>
                                                <div className="item --times" key={slotIndex}>
                                                    <span className="time">{slotItem.start}</span>
                                                    <span className="time">-</span>
                                                    <span className="time">{slotItem.end}</span>
                                                </div>
                                            </>)
                                        }
                                    </div>
                                </div>
                                {
                                    groups.map((groupItem: any, groupIndex: number) => <>
                                        <div className="timetable__row" key={groupIndex}>
                                            <div className="timetable__items">
                                                {
                                                    groupItem.schedule[scheduleIndex] ? groupItem.schedule[scheduleIndex].subjects.map((subjectItem: any, subjectIndex: number) => <>
                                                        <Item
                                                            key={subjectIndex}
                                                            slotIndex={subjectIndex}
                                                            scheduleIndex={scheduleIndex}
                                                            groupIndex={groupIndex}
                                                            subjectItem={subjectItem}
                                                            moveSubject={(fromIndex: number, toIndex: number) => moveSubject(fromIndex, toIndex)}
                                                        />
                                                    </>)
                                                        :
                                                        scheduleItem.slots.map((_: any, key: number) => (
                                                            <Item
                                                                key={key}
                                                                slotIndex={key}
                                                                groupIndex={groupIndex}
                                                                scheduleIndex={scheduleIndex}
                                                                moveSubject={(fromIndex: number, toIndex: number) => moveSubject(fromIndex, toIndex)}
                                                            />
                                                        ))

                                                }
                                            </div>


                                        </div>
                                    </>)
                                }
                            </div>
                        
                    </>)
                }
            </div>
            </DndProvider >
        </>
    );
}

export default TimetableCreate;