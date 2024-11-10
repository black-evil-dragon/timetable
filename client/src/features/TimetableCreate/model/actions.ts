import { contextMenuActions } from "@shared/ContextMenu";
import { Actions } from "@shared/types";



export const ActionsDataSet: {
    [key in string]: Actions
} = {
    'time-menu-edit': [contextMenuActions.edit, contextMenuActions.delete],
    'time-menu-add': [contextMenuActions.create]
}