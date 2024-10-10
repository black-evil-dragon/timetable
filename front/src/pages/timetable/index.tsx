import React from "react";

import { data, GroupType, SlotType, SubjectType } from "./types";

import { useParams } from "react-router-dom";
import TimetableCreate from "./ui/TimetableCreate";
import TimetableView from "./ui/TimetableView";
import NoPage from "@pages/404";
import Input from "@shared/ui/Input";


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
            if (!group.schedule || group.schedule.length < updatedSchedule.length) {
                // Инициализируем расписание, если его нет
                group.schedule = group.schedule || [];

                // Заполняем недостающие дни
                updatedSchedule.forEach((weekDay) => {
                    const existingDay = group.schedule.find((day: any) => day.weekdayID === weekDay.id);

                    if (!existingDay) {
                        // Если день недели отсутствует, добавляем его с пустыми предметами
                        group.schedule.push({
                            id: weekDay.id,
                            slot: weekDay.slot,
                            weekdayID: weekDay.id,
                            weekday: weekDay.weekday,
                            subjects: weekDay.slots.map((slot: SlotType) => ({
                                id: slot.slot, // Присваиваем числовой ID
                                slot: slot.slot,
                                data: null
                            }))
                        });
                    }
                });
            }

            // Проходим по дням расписания группы
            group.schedule.forEach((groupDaySchedule: any, dayIndex: number) => {
                const daySlots = updatedSchedule[dayIndex].slots;

                // Если у дня нет предметов, создаем пустые слоты на основе общего расписания
                if (!groupDaySchedule.subjects || groupDaySchedule.subjects.length === 0) {
                    groupDaySchedule.subjects = daySlots.map((slot: any) => ({
                        id: slot.slot, // Присваиваем числовой ID
                        slot: slot.slot,
                        data: null
                    }));
                }

                // Заполняем промежутки между предметами
                const filledSubjects: any = [];
                daySlots.forEach((slot: any) => {
                    const existingSubject = groupDaySchedule.subjects.find((subject: any) => subject.slot === slot.slot);
                    if (existingSubject) {
                        filledSubjects.push(existingSubject);
                    } else {
                        // Добавляем пустой слот, если предмет отсутствует
                        filledSubjects.push({
                            id: slot.slot, // Присваиваем числовой ID
                            slot: slot.slot,
                            data: null
                        });
                    }
                });

                // Обновляем расписание группы на этот день с заполненными слотами
                groupDaySchedule.subjects = filledSubjects;
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