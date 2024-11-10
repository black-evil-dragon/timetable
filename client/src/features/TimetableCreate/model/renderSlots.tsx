import { Slot } from "@features/TimetableSlot";

import { manageItemContentType, PositionSlotType } from "@shared/types";
import type { ItemSlotType } from "..";



interface renderSlotsPropsType {
    slotPosition: PositionSlotType,

    slots?: ItemSlotType[],

    // moveItem: (fromPosition: PositionSlotType, toPosition: PositionSlotType) => void,
    // manageItemContent: manageItemContentType
}

export const renderSlots = ({
    slotPosition,

    slots,

    // moveItem,
    // manageItemContent,
}: renderSlotsPropsType) => {
    

    return (
        slots && slots.map((itemSlot: ItemSlotType, itemIndex: number) => {
            const itemProps = {
                slotPosition: {
                    ...slotPosition,
                    timeSlot: itemIndex,
                },

                itemSlot,

                // moveItem,
                // manageItemContent,
            };

            return (
                <Slot
                    key={`day-${slotPosition.daySlot}-slot-${itemIndex}`}
                    {...itemProps}
                />
            );
        })
    );
}