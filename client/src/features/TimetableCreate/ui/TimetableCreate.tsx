import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Store
import { useAppDispatch, useAppSelector } from "@app/Store/hooks";
import { updateItemContent, manageTimeContent, updateTimeContent } from "../model/slice";


// Logic code
import { ActionsDataSet } from "..";
import { renderSlots } from "@features/TimetableSlot";


// Useful ui, types, hooks
import { EditableField, EditPanel } from "@features/EditPanel";
import { ContextMenu } from "@shared/ContextMenu";
import { useContextMenu } from "@hooks/useContextMenu";
import { PositionSlotType } from "@shared/types";



interface TimetableCreateProps {
}


const TimetableCreate: React.FunctionComponent<TimetableCreateProps> = () => {

    /**
     * Store
     */
    const dispatch = useAppDispatch();
    const timetables = useAppSelector((state) => state.timetable.timetables);
    const editItem = useAppSelector((state) => state.timetable.editItem);

    /**
     * Context Menu hook
     */
    const { contextMenuState, ContextMenuManager } = useContextMenu(ActionsDataSet)


    /**
     * handle event 'onContextMenu'. CMS - ContextMenuState. 
     * Заранее думаю, что будет много разных менюшек и поэтому
     * можно разделять для каждого объекта
     * @param event React.MouseEvent<HTMLDivElement, MouseEvent>
     */
    const handleCMSTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, position: PositionSlotType) => {
        ContextMenuManager.set(event, { onAction(action) { 
            dispatch(manageTimeContent({
                position: position,
                actionType: action 
            }));
        }})
    }

    const handleEditSubmit = (updatedFields: EditableField[]) => {
        if (editItem) {
            switch(editItem.target) {
                case 'time':
                    dispatch(updateTimeContent({ fields: updatedFields, position: editItem.position }))
                    break
                case 'item':
                    dispatch(updateItemContent({ fields: updatedFields, position: editItem.position }))
                    break

                default:
                    break
            }
        }
    };

    React.useEffect(() => {

    }, [])

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="timetable">
                    {
                        // Timetable
                        timetables.map((timetable, timetableIndex) => (
                            <div className="timetable-unit" key={`timetable-unit-${timetableIndex}`}>
                                <div className="timetable-unit__title">
                                    {timetable.title}
                                </div>
                                <div className="timetable-interval">
                                    <div className="timetable-interval__title">
                                        Время
                                    </div>
                                    {timetable.intervals.map((interval, intervalIndex) => (
                                        <div className="timetable-time" key={`interval-${intervalIndex}`}
                                            onContextMenu={event => handleCMSTime(event, {timetableSlot: timetableIndex, timeSlot: intervalIndex})}
                                            data-context-menu="time-menu-content"
                                            data-time-index={intervalIndex}
                                        >
                                            <span className="timetable-time__start">{interval.start}</span>
                                            <span className="timetable-time__separator">-</span>
                                            <span className="timetable-time__end">{interval.end}</span>
                                        </div>
                                    ))}

                                    <div className="timetable-time"
                                        onContextMenu={event => handleCMSTime(event, { timetableSlot: timetableIndex })}
                                        data-context-menu="time-menu-empty"
                                        // data-time-index={intervalIndex}
                                    >
                                        <span className="timetable-time__title">+</span>
                                        {/* <span className="timetable-time__start">{interval.start}</span>
                                        <span className="timetable-time__separator">-</span>
                                        <span className="timetable-time__end">{interval.end}</span> */}
                                    </div>
                                </div>
                                <div className="timetable-week">
                                    
                                    {timetable.days.map((day, dayIndex) => (
                                        <div className="timetable-day" key={`day-${dayIndex}`}>
                                            <div className="timetable-day__title">
                                                {day.title}
                                            </div>
                                            <div className="timetable-slots">
                                                {(() => {
                                                    const data = {
                                                        slotPosition: {
                                                            timetableSlot: timetableIndex,
                                                            daySlot: dayIndex,
                                                        },
                                                        slots: day.slots,
                                                        // moveItem,
                                                        // manageItemContent,
                                                    }

                                                    return renderSlots({ ...data })
                                                })()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }

                    {/* Context Menu-s */}
                    {contextMenuState && (
                        <ContextMenu {...contextMenuState} />
                    )}
                    {/* -=- */}

                    <div className={`timetable-modal ${editItem ? '--active' : ''}`}>
                        {editItem && (
                            <EditPanel
                                editableFields={editItem.editableFields}
                                onSave={handleEditSubmit}
                            />
                        )}
                    </div>
                </div>

                {/* <CustomDragLayer /> */}
            </DndProvider >
        </>
    );
}

export default TimetableCreate;