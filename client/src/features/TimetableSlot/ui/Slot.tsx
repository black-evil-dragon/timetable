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


import './timetable-slot.scss'

interface SlotProps {
    slotPosition: PositionSlotType;

    itemSlot?: ItemSlotType;
}



const Slot: React.FC<SlotProps> = ({
    slotPosition, itemSlot,
}) => {

    const dispatch = useAppDispatch();
    const { contextMenuState, ContextMenuManager } = useContextMenu(ActionsDataSet)
    const [classProps, setClassProps] = React.useState('')
    const [moved, setMoved] = React.useState(false)

    
    // Drop events
    const [{ isOver, monitor }, drop] = useDrop({
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
            monitor: monitor,
        }),
    });

    const handleMoveItem = (fromPosition: PositionSlotType, toPosition: PositionSlotType) => {
        dispatch(moveItem({
            fromPosition,
            toPosition
        }))
    }



    // Logic
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        ContextMenuManager.set(event, { onAction(action) {
            dispatch(manageItemContent({
                position: slotPosition,
                actionType: action
            }))
        }})
    }


    /*
    * Вынес логику, чтобы не засорять jsx
    */
    React.useEffect(() => {
        setClassProps([
            isOver ? '--hovered ' : '',
            (itemSlot && itemSlot.data) ? '--content ' : '',
            moved ? '--moved ' : '',
        ].join(''))
    
    }, [isOver, itemSlot, itemSlot?.data, moved])

    React.useEffect(() => {
        monitor &&
            JSON.stringify(monitor.getItem()?.slotPosition) === JSON.stringify(slotPosition) ?
            setMoved(true)
            :
            setMoved(false)
    }, [monitor.getItem()])
    

    return (
        <>
            <div
                ref={drop}
                className={`timetable-slot ${classProps}`}

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