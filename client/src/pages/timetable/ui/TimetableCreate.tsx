import React, { act } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


// Model - Logic code
import { renderSlots } from "../model/renderSlots";


// Types
import { GroupType, manageItemContentType, ScheduleType, PositionSlotType, TimeSlotType } from "@shared/types";


interface TimetableCreateProps {
    data: {
        groups: GroupType[],
        schedule: ScheduleType[]
    };
}


const TimetableCreate: React.FunctionComponent<TimetableCreateProps> = ({ data }) => {

    const [groups, setGroups] = React.useState(data.groups)
    const [schedule, setSchedule] = React.useState(data.schedule)


    const moveItem = (fromPosition: PositionSlotType, toPosition: PositionSlotType) => {
        const updatedGroups = [...groups];

        // Получаем предметы из исходной и целевой позиций
        const fromItem = updatedGroups[fromPosition.groupSlot].slots[fromPosition.daySlot].slots[fromPosition.timeSlot!];
        const toItem = updatedGroups[toPosition.groupSlot].slots[toPosition.daySlot].slots[toPosition.timeSlot!];

        // Перемещаем сущности
        updatedGroups[fromPosition.groupSlot].slots[fromPosition.daySlot].slots[fromPosition.timeSlot!] = toItem;
        updatedGroups[toPosition.groupSlot].slots[toPosition.daySlot].slots[toPosition.timeSlot!] = fromItem;

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

        const item = updatedGroups[itemPosition.groupSlot].slots[itemPosition.daySlot].slots[itemPosition.timeSlot!]
        
        switch (action) {
            case 'create':
                if (item) {
                    item.data = itemData
                }
                break;
            case 'delete':
                if (item && item.data) {
                    item.data = null
                }
                break;
            
            case 'edit':
                if (item && item.data) {
                    item.data!.title = 'test'
                }
                break;

            default:
                break
                
        }

        setGroups(updatedGroups)
    }


    React.useEffect(() => {
    }, [])


    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="timetable">
                    {
                        schedule.map((scheduleItem: ScheduleType, scheduleIndex: number) => (
                            <div className="timetable__day" key={`day-${scheduleIndex}`}>
                                <div className="timetable__row --system">
                                    <span className="day">{scheduleItem.title}</span>
                                </div>
                                <div className="timetable__row --system">
                                    <div className="timetable__slots --times">
                                        {
                                            scheduleItem.slots.map((timeSlot: TimeSlotType, slotIndex: number) => (
                                                <div className="time" key={slotIndex}>
                                                    <span className="time-start">{timeSlot.start}</span>
                                                    <span className="time-separator">-</span>
                                                    <span className="time-end">{timeSlot.end}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    groups.map((groupItem: GroupType, groupIndex: number) => {
                                        const slotPosition: PositionSlotType = {
                                            groupSlot: groupIndex,
                                            daySlot: scheduleIndex,
                                            timeSlot: null,
                                        }

                                        return renderSlots({
                                            slotPosition,

                                            groupItem,

                                            moveItem,
                                            manageItemContent
                                        })
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