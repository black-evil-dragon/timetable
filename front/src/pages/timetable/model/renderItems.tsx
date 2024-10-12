import { Item } from "@features/TimetableItem";
import { GroupType, manageItemContentType, PositionItemType, ScheduleType, SubjectType } from "@shared/types/types";


interface renderGroupItemsTypes {
    groupItem: GroupType,
    scheduleIndex: number,
    groupIndex: number,
    moveSubject: (fromPosition: PositionItemType, toPosition: PositionItemType) => void,
    manageItemContent: manageItemContentType
}

export const renderGroupItems = ({
    groupItem,
    scheduleIndex,
    groupIndex,
    moveSubject,
    manageItemContent,
}: renderGroupItemsTypes) => {
    const subjects = groupItem.schedule[scheduleIndex]?.subjects;

    return (
        <div className="timetable__row" key={groupIndex}>
            <div className="timetable__items">
                {subjects ? (
                    subjects.map((subjectItem: SubjectType, subjectIndex: number) => {
                        const itemProps = {
                            itemPosition: {
                                scheduleIndex,
                                groupIndex,
                                slotIndex: subjectIndex,
                            },
                            subjectItem,
                            moveSubject,
                            manageItemContent,
                        };

                        return (
                            <Item
                                key={subjectIndex}
                                {...itemProps}
                            />
                        );
                    })
                ) : (
                    <>Dont exist</>
                )}
            </div>
        </div>
    );
}