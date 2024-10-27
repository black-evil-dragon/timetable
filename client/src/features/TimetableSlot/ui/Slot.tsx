import React from 'react';
import { useDrop } from 'react-dnd';

import { ContextMenu } from '@entities/ContextMenu';
import { Item } from '@entities/TimetableItem';


import { manageItemContentType, PositionSlotType, ItemSlotType } from '@shared/types';

import { contextMenuActions } from '@shared/manager';
import { Actions } from '@shared/types';



interface SlotProps {
    slotPosition: PositionSlotType;

    itemSlot?: ItemSlotType;

    moveItem: (fromPosition: PositionSlotType, toPosition: PositionSlotType) => void;
    manageItemContent: manageItemContentType,
}



const Slot: React.FC<SlotProps> = ({
    slotPosition, itemSlot,
    moveItem, manageItemContent
}) => {
    
    // Drop events
    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        drop: (item: {
            slotPosition: PositionSlotType
        }) => {
            moveItem(
                item.slotPosition, // from position
                slotPosition       // to position
            )
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });


    // States
    const [contextPosition, setContextPosition] = React.useState({x: 0, y: 0})
    const [isContextMenuVisible, setContextMenuVisible] = React.useState(false)
    const [availableActions, setActions] = React.useState<Actions>(null)


    // Logic
    const onAction = (action: string) => {
        setContextMenuVisible(false)
        manageItemContent(slotPosition, action)
    };

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        
        setContextPosition({
            x: event.pageX,
            y: event.pageY,
        })
        setContextMenuVisible(true)
    }

    const getActions = React.useCallback(() => {
        if (itemSlot && itemSlot.data) {
            setActions([
                contextMenuActions.edit,
                contextMenuActions.delete,
            ]);
        } else {
            setActions([
                contextMenuActions.create,
            ]);
        }
    }, [itemSlot?.data]);


    // React useEffect
    React.useEffect(() => {
        getActions()

    }, [itemSlot?.data]);
    

    return (
        <>
            <div
                ref={drop}
                className={`slot ${isOver ? '--hovered' : ''}`}
                onContextMenu={onContextMenu}
            >
                {itemSlot && itemSlot.data ? (
                    <Item id={slotPosition.timeSlot} data={itemSlot.data} slotPosition={slotPosition} />
                ) : (
                    <div className="item --null"></div>
                )}
            </div>
            {isContextMenuVisible && (
                <ContextMenu
                    position={contextPosition}
                    onAction={onAction} 
                    onClose={() => setContextMenuVisible(false)}
                    actions={availableActions}
                />
            )}
        </>
    );
};

export default Slot;