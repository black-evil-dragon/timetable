import React from "react";
import { useDrop } from "react-dnd";
import Subject from "./Subject";
import { PositionItemType, SubjectType } from "../types";


interface ItemContextMenuProps {
    top: number;
    left: number;
    children: React.ReactNode;
}

const ItemContextMenu: React.FunctionComponent<ItemContextMenuProps> = ({ top, left, children }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
                background: 'white',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
                padding: '10px',
                zIndex: 1000,
            }}
            className="context-menu"
        >
            {children}
        </div>
    );
}




interface ItemProps {
    slotIndex: number;
    itemPosition: PositionItemType
    subjectItem?: SubjectType;

    moveSubject: (fromPosition: PositionItemType, toPosition: PositionItemType) => void;
}

const Item: React.FunctionComponent<ItemProps> = ({ slotIndex, subjectItem, itemPosition, moveSubject }) => {

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
    const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        
        setContextPosition({
            x: event.pageX,
            y: event.pageY,
        })
        setContextMenuVisible(true)
    }

    const closeContextMenu = () => {
        setContextMenuVisible(false);
    };


    // React useEffect
    React.useEffect(() => {
        if (isContextMenuVisible) {
            document.addEventListener("mousedown", closeContextMenu);
        } else {
            document.removeEventListener("mousedown", closeContextMenu);
        }

        return () => {
            document.removeEventListener("mousedown", closeContextMenu);
        };
    }, [isContextMenuVisible]);

    return (
        <>
            <div
                ref={drop}
                className={`item ${isOver ? '--hovered' : ''}`}
                onContextMenu={onContextMenu}
            >
                {subjectItem && subjectItem.data ? (
                    <Subject id={slotIndex} data={subjectItem.data} itemPosition={itemPosition} />
                ) : (
                    <div className="subject --null"></div>
                )}
            </div>
            {isContextMenuVisible && (
                <ItemContextMenu top={contextPosition.y} left={contextPosition.x}>
                    <ul>
                        <li>Edit</li>
                        <li>Copy</li>
                        <li>Delete</li>
                    </ul>
                </ItemContextMenu>
            )}
        </>
    );
}

export default Item;
