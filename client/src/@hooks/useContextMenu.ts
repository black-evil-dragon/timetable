import React from 'react';

import { ContextMenuProps, ContextMenuUpdateProps } from '@shared/ContextMenu';

// Types
import { Actions } from '@shared/types';


type hookProps = {
    [key in string]: Actions
}

export function useContextMenu(ActionsDataSet: hookProps) {
    const [contextMenuState, setState] = React.useState<ContextMenuProps | null>();

    const set = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, propsState?: ContextMenuUpdateProps) => {
        event.preventDefault();

        const target = event.currentTarget.dataset.contextMenu
        const positionContextMenu = {
            x: event.pageX,
            y: event.pageY,
        }

        let availableActions: Actions = []
        if (target && (target in ActionsDataSet)) {
            availableActions = ActionsDataSet[target]
        }

        setState({
            position: positionContextMenu,
            actions: availableActions,
            onClose() {
                setState(null)
            },
            ...propsState,
        })
    }, []);

    
    const update = (newState: ContextMenuUpdateProps) => {

    }

    return {
        contextMenuState,
        ContextMenuManager: {
            set,
            update
        }
    };
}