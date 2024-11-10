import { useDrag } from "react-dnd";

import { PositionSlotType } from "@shared/types";

interface ItemProps {
    id: number | null,
    data: {
        title?: string,
        teacher?: string,
        cabinet?: string,
    },
    slotPosition?: PositionSlotType
}

const Item: React.FunctionComponent<ItemProps> = (props = {
    id: 0,
    data: {
        title: '',
        teacher: '',
        cabinet: '',
    }
}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { 
            slotIndex: props.id,
            slotPosition: props.slotPosition,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return ( 
        <div className="timetable-item" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="timetable-item__title">
                {props.data.title}
            </div>
            <div className="timetable-item__content">
                <div className="timetable-item__teacher --content-item">
                    {props.data.teacher}
                </div>

                <div className="timetable-item__cabinet --content-item">
                    {props.data.cabinet}
                </div>
            </div>
        </div>
    );
}

export default Item;