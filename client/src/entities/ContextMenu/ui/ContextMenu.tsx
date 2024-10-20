import React from "react";

import { renderContextMenu } from "..";

import { Action, Actions } from "@shared/types/context-menu";

import '@styles/features/index.scss'

interface ContextMenuProps {
    top: number;
    left: number;
    children?: React.ReactNode;

    actions: Actions

    onAction: (action: string) => void;
    onClose: () => void;
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    top, left, children,
    actions,
    onAction, onClose
}) => {

    const menuRef = React.useRef<HTMLDivElement>(null);

    const closeContextMenu = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const onClickHandler = (action: Action) => {
        action.type && onAction(action.type);
        onClose()
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", closeContextMenu);

        return () => {
            document.removeEventListener("mousedown", closeContextMenu);
        };
    }, []);


    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{
                top: `${top}px`,
                left: `${left}px`,
            }}
        >
            {renderContextMenu({ actions, onClickHandler})}
        </div>
    );
}

export default ContextMenu;