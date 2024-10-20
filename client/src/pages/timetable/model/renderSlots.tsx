import { Slot } from "@features/TimetableSlot";

import { GroupType, manageItemContentType, ItemSlotType, PositionSlotType } from "@shared/types";



interface renderSlotsPropsType {
    slotPosition: PositionSlotType,

    groupItem: GroupType,

    moveItem: (fromPosition: PositionSlotType, toPosition: PositionSlotType) => void,
    manageItemContent: manageItemContentType
}

export const renderSlots = ({
    slotPosition,

    groupItem,

    moveItem,
    manageItemContent,
}: renderSlotsPropsType) => {
    const { groupSlot, daySlot } = slotPosition
    const items = groupItem.slots[daySlot]?.slots;
    

    return (
        <div className="timetable__row" key={`group-${groupSlot}-day-${daySlot}`}>
            <div className="timetable__slots --items">
                {items ? (
                    items.map((itemSlot: ItemSlotType, itemIndex: number) => {
                        const itemProps = {
                            slotPosition: {
                                ...slotPosition,
                                timeSlot: itemIndex,
                            },

                            itemSlot,

                            moveItem,
                            manageItemContent,
                        };

                        const key = `$slot-${itemIndex}`

                        return (
                            <Slot
                                key={key}
                                {...itemProps}
                            />
                        );
                    })
                ) : (
                    <>Dont exist</>
                )}
            </div>
        </div>
    );
}