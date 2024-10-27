import React from "react";

import { ContextMenuProps } from "@entities/ContextMenu";
import { contextMenuActions } from "@shared/model/contextMenuActions";


export const handleContextMenuAction = (action: string, props: any) => {
    console.log(action, props.target);
}


export const getState = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const target = event.currentTarget.dataset.contextMenu
    const positionContextMenu = {
        x: event.pageX,
        y: event.pageY,
    }
    const availableActions = []

    switch (target) {
        case 'time-menu-edit':
            availableActions.push([contextMenuActions.edit, contextMenuActions.delete])

            break

        default:
            break
    }


    let state: ContextMenuProps = {
        position: positionContextMenu,
        actions: availableActions,
        onAction(action) {
            handleContextMenuAction(action, { target })
        },
        onClose() {
            // setState(null)
        },
    }


    return state
}