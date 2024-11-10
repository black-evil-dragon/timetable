import { contextMenuActions } from "@shared/ContextMenu";
import { Actions } from "@shared/types";

export const ActionsDataSet: {
    [key in string]: Actions
} = {
    'slot-item': [contextMenuActions.edit, contextMenuActions.delete],
    'slot-empty': [contextMenuActions.create]
}