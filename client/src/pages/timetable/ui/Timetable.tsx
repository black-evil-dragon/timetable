import React from "react";
import { useParams } from "react-router-dom";

import { TimetableCreate } from "@features/TimetableCreate";
import NoPage from "@pages/404";

import TimetableView from "./TimetableView";


import { data } from "@shared/types";

// Styles
import '../styles/timetable.scss'


// Types 
import type { DaySlotType, ItemSlotType, TimetableType } from "..";
import { setTimetables } from "@features/TimetableCreate/model/slice";
import { useAppDispatch } from "@app/Store/hooks";

interface TimetableProps {

}

const week = [
    {
        "id": Math.random().toString(36).substring(2, 9),
        "title": "Понедельник",
    },
    {
        "id": Math.random().toString(36).substring(2, 9),
        "title": "Вторник",
    },
    {
        "id": Math.random().toString(36).substring(2, 9),
        "title": "Среда",
    },
    {
        "id": Math.random().toString(36).substring(2, 9),
        "title": "Четверг",
    },
    {
        "id": Math.random().toString(36).substring(2, 9),
        "title": "Пятница",
    },
]

const Timetable: React.FunctionComponent<TimetableProps> = () => {
    const { page } = useParams();

    const [isLoading, setLoading] = React.useState(true)
    const dispatch = useAppDispatch();


    const prepareData = (timetables: TimetableType[]): TimetableType[] => {
        const updatedTimetables = timetables.map((timetable) => {
            const days: DaySlotType[] = [];

            week.forEach((day) => {
                const existingDay = timetable.days.find(d => d.title === day.title);

                if (existingDay) {
                    // Добавляем слоты, если их не хватает
                    const slots: ItemSlotType[] = [];
                    timetable.intervals.forEach((interval, intervalIndex) => {
                        const existingSlot = existingDay.slots.find(s => s.slot === intervalIndex);
                        if (existingSlot) {
                            slots.push(existingSlot)
                            return;
                        }

                        const slotData: ItemSlotType = {
                            id: Math.random().toString(36).substring(2, 9),
                            slot: intervalIndex,
                            data: null,
                        };
                        slots.push(slotData);
                    });
                    days.push({ ...existingDay, slots })

                }
                else {

                    const slots: ItemSlotType[] = timetable.intervals.map((interval, intervalIndex) => ({
                        id: Math.random().toString(36).substring(2, 9),
                        slot: intervalIndex,
                        data: null,
                    }));

                    const dayData: DaySlotType = {
                        id: day.id,
                        title: day.title,
                        slot: timetable.slot, // Используем slot из timetable
                        slots,
                    };

                    days.push(dayData)
                }

            });

            return { ...timetable, days };
        });

        return updatedTimetables;
    };


    React.useEffect(() => {
        dispatch(setTimetables(prepareData(data.timetables)));
        setLoading(false)
    }, [])
    
    return ( 
        <>
            {
                !isLoading ? (
                    page === 'create' ?
                        <TimetableCreate />
                        : page === 'view' ?
                            <TimetableView />
                            : <NoPage />
                ) :
                (<>Загрузка</>)
            }
        </>
     );
}
 
export default Timetable;