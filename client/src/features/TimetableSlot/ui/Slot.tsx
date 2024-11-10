import React from 'react';
import { useDrop } from 'react-dnd';

import { useContextMenu } from '@hooks/useContextMenu';

import { ContextMenu } from '@shared/ContextMenu';
import { Item } from '@entities/TimetableItem';

// Types
import type { PositionSlotType, } from '@shared/types';
import type { ItemSlotType } from '@pages/timetable';


// Model
import { ActionsDataSet } from '..';
import { manageItemContent, moveItem } from '@features/TimetableCreate/model/slice';
import { useAppDispatch } from '@app/Store/hooks';



interface SlotProps {
    slotPosition: PositionSlotType;

    itemSlot?: ItemSlotType;
}



const Slot: React.FC<SlotProps> = ({
    slotPosition, itemSlot,
}) => {

    const dispatch = useAppDispatch();

    const handleMoveItem = (fromPosition: PositionSlotType, toPosition: PositionSlotType) => {
        dispatch(moveItem({
            fromPosition,
            toPosition
        }))
    }
    
    // Drop events
    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        drop: (item: {
            slotPosition: PositionSlotType
        }) => {
            handleMoveItem(
                item.slotPosition, // from position
                slotPosition       // to position
            )
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });


    const { contextMenuState, ContextMenuManager } = useContextMenu(ActionsDataSet)
    

    // Logic
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        ContextMenuManager.set(event, { onAction(action) {
            dispatch(manageItemContent({
                position: slotPosition,
                actionType: action
            }))
        }})
    }
    

    return (
        <>
            <div
                ref={drop}
                className={`timetable-slot ${isOver ? '--hovered' : ''}`}

                onContextMenu={handleContextMenu}

                data-context-menu={
                    (itemSlot && itemSlot.data) ? `slot-item` : 'slot-empty'
                }

            >{(itemSlot && itemSlot.data) && (
                <Item id={slotPosition.timeSlot!} data={itemSlot.data} slotPosition={slotPosition} />
            )}</div>

            {contextMenuState && <ContextMenu {...contextMenuState} />}
        </>
    );
};

export default Slot;