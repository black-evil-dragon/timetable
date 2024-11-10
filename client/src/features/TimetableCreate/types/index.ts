export type TimetableType = {
    id: string,
    title: string;
    slot: number;
    days: DaySlotType[];
    intervals: TimeSlotType[];
}

export type DaySlotType = {
    id: string;
    title: string;
    slot: number;
    slots: ItemSlotType[];
}
export type TimeSlotType = {
    id: string,
    slot: number;
    start: string;
    end: string;
}

export type ItemSlotType = {
    id: string;
    slot: number;
    data: ItemDataType | null;
}

export type ItemDataType = {
    [key: string]: any;

    title: string;
    teacher: string;
    cabinet: string;
}