import React from "react";

interface ItemContextMenuProps {
    top: number;
    left: number;
    children?: React.ReactNode;
    onAction: (action: string) => void;
    onClose: () => void;
}

const ItemContextMenu: React.FunctionComponent<ItemContextMenuProps> = ({
    top, left, children,
    onAction, onClose
}) => {

    const menuRef = React.useRef<HTMLDivElement>(null);

    const closeContextMenu = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const onClickHandler = (action: string) => {
        onAction(action);
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
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
                background: 'white',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
                padding: '10px',
                zIndex: 1000,
            }}
        >
            <button onClick={() => onClickHandler('create')}>
                Создать
            </button>

            <button onClick={() => onClickHandler('delete')}>
                Удалить
            </button>
            
        </div>
    );
}

export default ItemContextMenu;