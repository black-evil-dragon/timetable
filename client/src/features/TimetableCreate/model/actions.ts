import { contextMenuActions } from "@shared/ContextMenu";
import { Actions } from "@shared/types";



export const ActionsDataSet: {
    [key in string]: Actions
} = {
    'time-menu-content': [contextMenuActions.edit, contextMenuActions.delete],
    'time-menu-empty': [contextMenuActions.create]
}