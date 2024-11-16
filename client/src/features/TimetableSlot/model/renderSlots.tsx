import { Slot } from "@features/TimetableSlot";

import type { PositionSlotType } from "@shared/types";
import type { ItemSlotType } from "@features/TimetableCreate";



interface renderSlotsPropsType {
    slotPosition: PositionSlotType,

    slots?: ItemSlotType[],
}

export const renderSlots = ({
    slotPosition,
    slots,
}: renderSlotsPropsType) => {
    

    return (
        <>
            {
                slots && slots.map((itemSlot: ItemSlotType, itemIndex: number) => {
                    const itemProps = {
                        slotPosition: {
                            ...slotPosition,
                            timeSlot: itemIndex,
                        },

                        itemSlot,
                    };

                    return (
                        <Slot
                            key={`day-${slotPosition.daySlot}-slot-${itemIndex}`}
                            {...itemProps}
                        />
                    );
                })
            }
        </>
    );
}