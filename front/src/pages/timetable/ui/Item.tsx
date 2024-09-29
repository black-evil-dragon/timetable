import React from "react";
import { useDrop } from "react-dnd";
import Subject from "./Subject";

interface ItemProps {
    slotIndex: number;
    groupIndex: number;
    scheduleIndex: number;
    subjectItem?: {
        id: number;
        data: {
            hasSubGroup: boolean;
            subGroup: number;
            title: string;
            teacher: string;
            cabinet: string;
        } | null;
    };
    moveSubject: (fromIndex: number, toIndex: number) => void;
}

const Item: React.FunctionComponent<ItemProps> = ({ slotIndex, subjectItem, moveSubject }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'subject',
        drop: (item: { slotIndex: number }) => {
            moveSubject(item.slotIndex, slotIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`item ${isOver ? '--hovered' : ''}`}>
            {subjectItem && subjectItem.data ? (
                <Subject id={slotIndex} data={subjectItem.data} />
            ) : (
                <div className="subject --null"></div>
            )}
        </div>
    );
}

export default Item;
