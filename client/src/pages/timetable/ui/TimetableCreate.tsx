import React, { act } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


// Model - Logic code
import { renderGroupItems } from "../model/renderItems";


// Types
import { GroupType, manageItemContentType, PositionItemType, ScheduleType, SlotType } from "@shared/types/types";


interface TimetableCreateProps {
    data: {
        groups: GroupType[],
        schedule: ScheduleType[]
    };
}


const TimetableCreate: React.FunctionComponent<TimetableCreateProps> = ({ data }) => {

    const [groups, setGroups] = React.useState(data.groups)
    const [schedule, setSchedule] = React.useState(data.schedule)


    const moveSubject = (fromPosition: PositionItemType, toPosition: PositionItemType) => {
        const updatedGroups = [...groups];

        // Получаем предметы из исходной и целевой позиций
        const fromSubject = updatedGroups[fromPosition.groupIndex].schedule[fromPosition.scheduleIndex].subjects[fromPosition.slotIndex];
        const toSubject = updatedGroups[toPosition.groupIndex].schedule[toPosition.scheduleIndex].subjects[toPosition.slotIndex];

        // Перемещаем предметы
        updatedGroups[fromPosition.groupIndex].schedule[fromPosition.scheduleIndex].subjects[fromPosition.slotIndex] = toSubject;
        updatedGroups[toPosition.groupIndex].schedule[toPosition.scheduleIndex].subjects[toPosition.slotIndex] = fromSubject;

        // Обновляем состояние
        setGroups(updatedGroups);
    };

    const manageItemContent: manageItemContentType = (itemPosition, action) => {
        const updatedGroups = [...groups];
        const itemData = {
            "hasSubGroup": false,
            "subGroup": 0,
            "title": "Название",
            "teacher": "Организатор",
            "cabinet": "Место"
        }

        const slot = updatedGroups[itemPosition.groupIndex].schedule[itemPosition.scheduleIndex].subjects[itemPosition.slotIndex]
        
        switch (action) {
            case 'create':
                if (slot) {
                    slot.data = itemData
                }
                break;
            case 'delete':
                if (slot) {
                    slot.data = null
                }
                break;

            default:
                break
                
        }

        setGroups(updatedGroups)
    }


    React.useEffect(() => {
        manageItemContent({
            groupIndex: 0,
            scheduleIndex: 0,
            slotIndex: 0,
        }, 'create')
    }, [])


    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="timetable">
                    {
                        schedule.map((scheduleItem: ScheduleType, scheduleIndex: number) => (
                            <div className="timetable__day" key={scheduleIndex}>
                                <div className="timetable__row --system">
                                    <span className="day">{scheduleItem.weekday}</span>
                                </div>
                                <div className="timetable__row --system">
                                    <div className="timetable__items --times">
                                        {
                                            scheduleItem.slots.map((slotItem: SlotType, slotIndex: number) => (
                                                <div className="item --times" key={slotIndex}>
                                                    <span className="time">{slotItem.start}</span>
                                                    <span className="time">-</span>
                                                    <span className="time">{slotItem.end}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    groups.map((groupItem: GroupType, groupIndex: number) => {
                                        return renderGroupItems({groupItem, scheduleIndex, groupIndex, moveSubject, manageItemContent})
                                    })
                                }
                            </div>

                        ))
                    }
                </div>
            </DndProvider >
        </>
    );
}

export default TimetableCreate;