import React from "react";

import { Action, Actions } from "@shared/types/context-menu";
import { AiOutlineMenu } from "react-icons/ai";

interface ContextMenuProps {
    actions?: Actions;
    onClickHandler: (action: Action) => void;
}

export const renderContextMenu = ({ actions, onClickHandler }: ContextMenuProps) => {
    /**
     * ### Функция `renderAction`
     * Рендерит главное действие и субдействия,
     * если такие есть
     */
    const renderAction = (action: Action, props?: any) => (
        <li key={`${action.label}-${props.index}`} className="context-menu__item --action">
            <button className="context-menu__button" onClick={() => onClickHandler(action)}>
                {action.icon}
                {action.label}
            </button>

            {action.items && <AiOutlineMenu />}

            {action.items && (
                <div className="context-menu__submenu">
                    {renderActionList(action.items, {className: '--submenu-item'})}
                </div>
            )}
        </li>
    );

    /**
     * ### Функция `renderActionList`
     * Рендерит заданный список действий
     */
    const renderActionList = (actions: Actions, props?: any) => (
        
        <ul className={`context-menu__item --group ${props?.className && props.className}`}>
            {
                actions!.map((action, index) => renderAction(action as Action, { index }))
            }
        </ul>
    );

    /**
     * Рендер
     */
    const render = (actions: Actions) => {
        return actions!.map((action, index) => (
            <React.Fragment key={`action-group-${index}`}>
                {index > 0 && <div className="context-menu__separator" />}

                {Array.isArray(action) ? renderActionList(action) : renderActionList([action])}
            </React.Fragment>
        ));
    };

    return (
        actions && render(actions)
    );
};