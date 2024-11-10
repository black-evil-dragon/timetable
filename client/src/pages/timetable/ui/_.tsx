export {}

// import React from "react";
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'


// // Model - Logic code
// import { renderSlots } from "../model/renderSlots";
// import { ActionsDataSet } from "../model/actions";


// // Types
// import { manageItemContentType, PositionSlotType } from "@shared/types";
// import { EditPanel } from "@features/EditPanel";
// import { ContextMenu } from "@shared/ContextMenu";
// import { useContextMenu } from "@hooks/useContextMenu";
// import { TimetableType } from "..";




// interface TimetableCreateProps {
//     data: {
//         timetables: TimetableType[],
//     };
// }


// const TimetableCreate: React.FunctionComponent<TimetableCreateProps> = ({ data }) => {

//     /*
//     * States
//     */
//     const [timetables, setTimetables] = React.useState(data.timetables)
//     const [editItem, setEditItem] = React.useState<null | { itemPosition: PositionSlotType; editableFields: any[] }>(null);

//     const { contextMenuState, ContextMenuManager } = useContextMenu(ActionsDataSet)


//     /*
//     * Logic
//     */
//     const moveItem = (fromPosition: PositionSlotType, toPosition: PositionSlotType) => {
//         const updatedTimetables = [...timetables];

//         // Получаем сущности из исходной и целевой позиций
//         const fromItem = updatedTimetables[fromPosition.timetableSlot].days[fromPosition.daySlot].slots[fromPosition.timeSlot!];
//         const toItem = updatedTimetables[toPosition.timetableSlot].days[toPosition.daySlot].slots[toPosition.timeSlot!];

//         // Перемещаем сущности
//         updatedTimetables[fromPosition.timetableSlot].days[fromPosition.daySlot].slots[fromPosition.timeSlot!] = toItem;
//         updatedTimetables[toPosition.timetableSlot].days[toPosition.daySlot].slots[toPosition.timeSlot!] = fromItem;

//         // Обновляем состояние
//         setTimetables(updatedTimetables);
//     };


//     const manageItemContent: manageItemContentType = (itemPosition, action) => {
//         const updatedTimetables = [...timetables];
//         const baseItemData = {
//             "hasSubGroup": false,
//             "subGroup": 0,
//             "title": "Название",
//             "teacher": "Организатор",
//             "cabinet": "Место"
//         }

//         const item = updatedTimetables[itemPosition.timetableSlot].days[itemPosition.daySlot].slots[itemPosition.timeSlot!]
        
//         switch (action) {
//             case 'create':
//                 if (item) {
//                     item.data = baseItemData
//                 }
//                 break;
//             case 'delete':
//                 if (item && item.data) {
//                     item.data = null
                    
//                     if (editItem) setEditItem(null)
//                 }
//                 break;
            
//             case 'edit':
//                 if (item && item.data) {
//                     setEditItem({
//                         itemPosition,
//                         editableFields: [
//                             { name: "title", value: item.data.title, placeholder: "Название" },
//                             { name: "cabinet", value: item.data.cabinet, placeholder: "Место" },
//                             { name: "teacher", value: item.data.teacher, placeholder: "Организатор" },
//                         ],
//                     });
//                 }
//                 break;

//             default:
//                 break
                
//         }

//         updatedTimetables !== timetables && setTimetables(updatedTimetables)
//     }


//     const manageTimeContent = (action: string) => {
//         console.log(action);
//     }




//     const onContextMenuState = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         ContextMenuManager.set(event, { onAction(action) { manageTimeContent(action) }})
//     }


//     const handleEditSubmit = (updatedFields: any[]) => {
//         if (editItem) {
//             const updatedTimetables = [...timetables];
//             const { itemPosition } = editItem;
//             const item = updatedTimetables[itemPosition.timetableSlot].days[itemPosition.daySlot].slots[itemPosition.timeSlot!];

//             // Обновить данные элемента
//             updatedFields.forEach((field) => {
//                 if (item && item.data) {
//                     item.data[field.name] = field.value;
//                 }
//             });

//             setTimetables(updatedTimetables);
//             setEditItem(null);
//         }
//     };

//     React.useEffect(() => {
//         // console.log(data);
//     }, [])

//     return (
//         <>
//             <DndProvider backend={HTML5Backend}>
//                 <div className="timetable">
//                     {
//                         // Timetable
//                         timetables.map((timetable, timetableIndex) => (
//                             <div className="timetable-unit" key={`timetable-unit-${timetableIndex}`}>
//                                 <div className="timetable-unit__title">
//                                     {timetable.title}
//                                 </div>
//                                 <div className="timetable-interval">
//                                     {timetable.intervals.map((interval, intervalIndex) => (
//                                         <div className="timetable-time" key={`interval-${intervalIndex}`} onContextMenu={onContextMenuState} data-context-menu="time-menu-edit">
//                                             <span className="timetable-time__start">{interval.start}</span>
//                                             <span className="timetable-time__separator">-</span>
//                                             <span className="timetable-time__end">{interval.end}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="timetable-week">
//                                     {timetable.days.map((day, dayIndex) => (
//                                         <div className="timetable-day" key={`day-${dayIndex}`}>
//                                             <div className="timetable-day__title">
//                                                 {day.title}
//                                             </div>
//                                             <div className="timetable-slots">
//                                                 {(() => {
//                                                     const data = {
//                                                         slotPosition: {
//                                                             timetableSlot: timetableIndex,
//                                                             daySlot: dayIndex,
//                                                         },
//                                                         slots: day.slots,
//                                                         moveItem,
//                                                         manageItemContent,
//                                                     }
                                                    
//                                                     return renderSlots({...data})
//                                                 })()}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))
//                     }

//                     {/* Context Menu-s */}
//                     {contextMenuState && (
//                         <ContextMenu {...contextMenuState} />
//                     )}
//                     {/* -=- */}

//                     <div className="timetable-test">
//                         {editItem && (
//                             <EditPanel
//                                 editableFields={editItem.editableFields}
//                                 onSave={handleEditSubmit}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </DndProvider >
//         </>
//     );
// }

// export default TimetableCreate;

// // {
// //     false && schedule.map((scheduleItem: ScheduleType, scheduleIndex: number) => (
// //         <div className="timetable__day" key={`day-${scheduleIndex}`}>
// //             {/* <div className="timetable__row --system">
// //                                     <span className="day">{scheduleItem.title}</span>
// //                                 </div>
// //                                 <div className="timetable__row --system">
// //                                     <div className="timetable__slots --times">
// //                                         {
// //                                             scheduleItem.slots.map((timeSlot: TimeSlotType, slotIndex: number) => (
// //                                                 <div className="time" key={slotIndex} onContextMenu={onContextMenu} data-context-menu="time-menu-edit">
// //                                                     <span className="time-start">{timeSlot.start}</span>
// //                                                     <span className="time-separator">-</span>
// //                                                     <span className="time-end">{timeSlot.end}</span>
// //                                                 </div>
// //                                             ))
// //                                         }
// //                                     </div>
// //                                 </div> */}
// //             {/* {
// //                                     groups.map((groupItem: GroupType, groupIndex: number) => {
// //                                         const slotPosition: PositionSlotType = {
// //                                             groupSlot: groupIndex,
// //                                             daySlot: scheduleIndex,
// //                                             timeSlot: null,
// //                                         }

// //                                         return renderSlots({
// //                                             slotPosition,

// //                                             groupItem,

// //                                             moveItem,
// //                                             manageItemContent
// //                                         })
// //                                     })
// //                                 } */}
// //         </div>

// //     ))
// // }