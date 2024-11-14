import React from "react";

import { DragPreviewOptions, DragSourceMonitor, useDrag } from "react-dnd";

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

    const [previewJSX, setPreviewJSX] = React.useState<JSX.Element>(<div className={`timetable-item`}>
        <div className="timetable-item__title">{props.data.title}</div>
        <div className="timetable-item__content">
            <div className="timetable-item__teacher --content-item">
                {props.data.teacher}
            </div>
            <div className="timetable-item__cabinet --content-item">
                {props.data.cabinet}
            </div>
        </div>
    </div>);

 
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: 'item',
        item: { 
            slotIndex: props.id,
            slotPosition: props.slotPosition,
            data: props.data,
            jsx: previewJSX,
            getJSX: () => previewJSX,
        },

        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    const previewRef = React.useRef(null);

    React.useEffect(() => {
        if (dragPreview && previewRef.current) {
            dragPreview(previewRef.current); // Используем пустой элемент
        }
    }, [dragPreview]);

    React.useEffect(() => {
        setPreviewJSX(
            <div className={`timetable-item`}>
                <div className="timetable-item__title">{props.data.title}</div>
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
    }, [props.data]);


    return ( 
        <>
            <div ref={previewRef} style={{ display: 'none' }}></div>
            <div
                ref={drag}
                className={`timetable-item ${isDragging ? '--dragging' : ''}`}
            >
                <div className="timetable-item__title">{props.data.title}</div>
                <div className="timetable-item__content">
                    <div className="timetable-item__teacher --content-item">
                        {props.data.teacher}
                    </div>
                    <div className="timetable-item__cabinet --content-item">
                        {props.data.cabinet}
                    </div>
                </div>
            </div>
        </>
        // <div className={`timetable-item ${isDragging ? '--dragging' : ''}`} ref={drag}>
        //     <div className="timetable-item__title">
        //         {props.data.title}
        //     </div>
        //     <div className="timetable-item__content">
        //         <div className="timetable-item__teacher --content-item">
        //             {props.data.teacher}
        //         </div>

        //         <div className="timetable-item__cabinet --content-item">
        //             {props.data.cabinet}
        //         </div>
        //     </div>
        // </div>
    );
}

export default Item;