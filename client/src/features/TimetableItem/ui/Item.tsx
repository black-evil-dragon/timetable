import React, { act } from 'react';
import { useDrop } from 'react-dnd';

import { manageItemContentType, PositionItemType, SubjectType } from '@shared/types/types';

import Subject from '@entities/TimetableSubject/Subject';
import ItemContextMenu from '@features/ItemContextMenu/ui/ItemContextMenu';

interface ItemProps {
    itemPosition: PositionItemType;
    subjectItem?: SubjectType;
    moveSubject: (fromPosition: PositionItemType, toPosition: PositionItemType) => void;
    manageItemContent: manageItemContentType,
    
}

const Item: React.FC<ItemProps> = ({
    itemPosition, subjectItem,
    moveSubject, manageItemContent
}) => {
    // Drop events
    const [{ isOver }, drop] = useDrop({
        accept: 'subject',
        drop: (item: {
            itemPosition: PositionItemType
        }) => {
            moveSubject(
                item.itemPosition, // from position
                itemPosition       // to position
            );
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });


    // States
    const [contextPosition, setContextPosition] = React.useState({x: 0, y: 0})
    const [isContextMenuVisible, setContextMenuVisible] = React.useState(false)


    // Logic
    const handleContextAction = (action: string) => {

    };

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        
        setContextPosition({
            x: event.pageX,
            y: event.pageY,
        })
        setContextMenuVisible(true)
    }


    // React useEffect
    React.useEffect(() => {

    }, []);

    return (
        <>
            <div
                ref={drop}
                className={`item ${isOver ? '--hovered' : ''}`}
                onContextMenu={onContextMenu}
            >
                {subjectItem && subjectItem.data ? (
                    <Subject id={itemPosition.slotIndex} data={subjectItem.data} itemPosition={itemPosition} />
                ) : (
                    <div className="subject --null"></div>
                )}
            </div>
            {isContextMenuVisible && (
                <ItemContextMenu
                    top={contextPosition.y}
                    left={contextPosition.x}
                    onAction={(action: string) => manageItemContent(itemPosition, action)}
                    onClose={() => setContextMenuVisible(false)}
                />
            )}
        </>
    );
};

export default Item;

// interface ItemProps {
//     slotIndex: number;
//     itemPosition: PositionItemType
//     subjectItem?: SubjectType;

//     moveSubject: (fromPosition: PositionItemType, toPosition: PositionItemType) => void;
// }

// const Item: React.FunctionComponent<ItemProps> = ({ slotIndex, subjectItem, itemPosition, moveSubject }) => {

//     // Drop events
//     const [{ isOver }, drop] = useDrop({
//         accept: 'subject',
//         drop: (item: {
//             itemPosition: PositionItemType
//         }) => {
//             moveSubject(
//                 item.itemPosition, // from position
//                 itemPosition       // to position
//             );
//         },
//         collect: (monitor) => ({
//             isOver: !!monitor.isOver(),
//         }),
//     });


//     // States
//     const [contextPosition, setContextPosition] = React.useState({x: 0, y: 0})
//     const [isContextMenuVisible, setContextMenuVisible] = React.useState(false)

//     const contextMenuRef = React.useRef<HTMLDivElement>(null);

//     // Logic
//     const handleContextAction = (action: string) => {
//         console.log(`Action: ${action}, Pos: ${itemPosition}`);
//         // Здесь можно добавить логику для выполнения нужного действия с предметом
//     };

//     const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         event.preventDefault()
        
//         setContextPosition({
//             x: event.pageX,
//             y: event.pageY,
//         })
//         setContextMenuVisible(true)
//     }


//     // React useEffect
//     React.useEffect(() => {

//     }, []);

//     return (
//         <>
//             <div
//                 ref={drop}
//                 className={`item ${isOver ? '--hovered' : ''}`}
//                 onContextMenu={onContextMenu}
//             >
//                 {subjectItem && subjectItem.data ? (
//                     <Subject id={slotIndex} data={subjectItem.data} itemPosition={itemPosition} />
//                 ) : (
//                     <div className="subject --null"></div>
//                 )}
//             </div>
//             {isContextMenuVisible && (
//                 <ItemContextMenu
//                     top={contextPosition.y}
//                     left={contextPosition.x}
//                     onAction={handleContextAction}
//                     onClose={() => setContextMenuVisible(false)}
//                 />
//             )}
//         </>
//     );
// }

// export default Item;
