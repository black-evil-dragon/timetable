import React from "react";
import { useParams } from "react-router-dom";

// UI
import NoPage from "@pages/404";
import TimetableCreate from "./ui/TimetableCreate";
import TimetableView from "./ui/TimetableView";

// Shared
import { data, DaySlotType, GroupType, ItemSlotType, ScheduleType, TimeSlotType } from "@shared/types";

// Styles
import '@styles/pages/timetable.scss'


interface TimetableProps {

}
 
const Timetable: React.FunctionComponent<TimetableProps> = () => {
    const { page } = useParams();
    
    const [groups, setGroups] = React.useState(data.groups)
    const [schedule, setSchedule] = React.useState(data.schedule)


    const prepareData = () => {
        const updatedGroups = [...groups];
        const updatedSchedule = [...schedule];

        updatedGroups.forEach((group: GroupType)  => {
            // Если у группы нет расписания или оно неполное, создаем полное расписание на основе общего расписания
            if (!group.slots || group.slots.length < updatedSchedule.length) {
                // Инициализируем расписание, если его нет
                group.slots = group.slots || [];

                // Заполняем недостающие дни
                updatedSchedule.forEach((weekDay: ScheduleType) => {
                    const existingDay = group.slots.find((daySlot: DaySlotType) => daySlot.weekdayID === weekDay.id);

                    if (!existingDay) {
                        group.slots.push({
                            id: weekDay.id,
                            slot: weekDay.slot,
                            weekdayID: weekDay.id,
                            weekdayTitle: weekDay.title,
                            slots: weekDay.slots.map((timeSlot: TimeSlotType) => ({
                                id: timeSlot.slot,
                                slot: timeSlot.slot,
                                data: null
                            }))
                        });
                    }
                });
            }

            // Проходим по дням расписания группы
            group.slots.forEach((daySlot: DaySlotType, dayIndex: number) => {
                const timeSlots = updatedSchedule[dayIndex].slots;

                // Если у дня нет сущностей, создаем пустые слоты на основе общего расписания
                if (!daySlot.slots || daySlot.slots.length === 0) {
                    daySlot.slots = timeSlots.map((timeSlot: TimeSlotType) => ({
                        id: timeSlot.slot,
                        slot: timeSlot.slot,
                        data: null
                    }));
                }

                // Заполняем промежутки между предметами
                const filledSlots: ItemSlotType[] = [];

                timeSlots.forEach((timeSlot: TimeSlotType) => {
                    const existingItem = daySlot.slots.find((itemSlot: ItemSlotType) => itemSlot.slot === timeSlot.slot);
                    
                    if (existingItem) {
                        filledSlots.push(existingItem);
                    } else {
                        // Добавляем пустой слот, если предмет отсутствует
                        filledSlots.push({
                            id: timeSlot.slot,
                            slot: timeSlot.slot,
                            data: null
                        });
                    }
                });

                // Обновляем расписание группы на этот день с заполненными слотами
                daySlot.slots = filledSlots;
            });
        });

        // Обновляем состояние
        setGroups(updatedGroups);
        setSchedule(updatedSchedule);
    };

    React.useEffect(() => {
        prepareData()
    }, [])
    
    return ( 
        <>
            {
                page === 'create' ?
                    <TimetableCreate data={{
                        groups: groups,
                        schedule: schedule,
                    }} />
                : page === 'view' ? 
                    <TimetableView /> 
                : <NoPage />
            }
        </>
     );
}
 
export default Timetable;