import { Actions } from "@shared/types";

export type ContextMenuProps = {
    position: {
        x: number,
        y: number,
    }

    children?: React.ReactNode;

    actions: Actions

    onAction?: (action: string, props?: any,) => void;
    onClose: () => void;
}

export type ContextMenuUpdateProps = {
    position?: {
        x: number,
        y: number,
    }

    children?: React.ReactNode;

    actions?: Actions

    onAction?: (action: string, props?: any,) => void;
    onClose?: () => void;
}

export type ActionTemplateType = {
    label: string;
    type: string;
    icon: JSX.Element;
}