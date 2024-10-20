import { Actions } from "@shared/types/context-menu";
import { AiOutlineEdit, AiFillAppstore, AiFillDelete, AiOutlinePlus } from "react-icons/ai";


export const temp: Actions = [
    {
        label: "Изменить",
        type: 'edit',
        icon: <AiOutlineEdit className="context-menu__button--icon" />,
        onClick: () => console.log("Изменить"),

    },
    {
        label: "Действие 1",
        icon: <AiFillAppstore className="context-menu__button--icon" />,
        items: [
            {
                label: "Вложенное действие 1",
                icon: <AiFillDelete className="context-menu__button--icon" />,
                onClick: () => console.log("Вложенное действие 1")
            },
            {
                label: "Вложенное действие 2",
                icon: <AiFillDelete className="context-menu__button--icon" />,
                onClick: () => console.log("Вложенное действие 2")
            },
        ]
    },
    {
        label: "Действие 2",
        icon: <AiFillAppstore className="context-menu__button--icon" />,
        items: [
            {
                label: "Вложенное действие 3",
                icon: <AiFillDelete className="context-menu__button--icon" />,
                onClick: () => console.log("Вложенное действие 3")
            },
            {
                label: "Вложенное действие 4",
                icon: <AiFillDelete className="context-menu__button--icon" />,
                onClick: () => console.log("Вложенное действие 4")
            },
        ]
    },
    {
        label: "Удалить",
        type: 'delete',
        icon: <AiFillDelete className="context-menu__button--icon" />,
    },
];