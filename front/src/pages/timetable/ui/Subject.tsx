import { useDrag } from "react-dnd";
import { PositionItemType } from "../types";


interface SubjectProps {
    id: number,
    data: {
        title?: string,
        teacher?: string,
        cabinet?: string,
    },
    itemPosition?: PositionItemType
}

const Subject: React.FunctionComponent<SubjectProps> = (props = {
    id: 0,
    data: {
        title: '',
        teacher: '',
        cabinet: '',
    }
}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'subject',
        item: { 
            slotIndex: props.id,
            itemPosition: props.itemPosition,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return ( 
        <div className="subject" data-subject-id={props.id} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="subject__title">
                {props.data.title}
            </div>
            <div className="subject__content">
                <div className="subject__teacher --content-item">
                    {props.data.teacher}
                </div>

                <div className="subject__cabinet --content-item">
                    {props.data.cabinet}
                </div>
            </div>
        </div>
    );
}

export default Subject;