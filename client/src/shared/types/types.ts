export type manageItemContentType = (itemPosition: PositionSlotType, action: string) => void

export type PositionSlotType = {
    timetableSlot: number,
    daySlot?: number | null,
    timeSlot?: number | null,
}











