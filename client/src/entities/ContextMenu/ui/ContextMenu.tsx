import React from "react";


import { Action } from "@shared/types/context-menu";
import '@styles/features/index.scss'

import { ContextMenuProps, renderContextMenu } from "..";



const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    position, children,
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
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
        >
            {renderContextMenu({ actions, onClickHandler})}
        </div>
    );
}

export default ContextMenu;