import { AiOutlineEdit, AiOutlinePlus, AiFillDelete } from "react-icons/ai"

const actionsTemplate = {
    edit: {
        label: "Изменить",
        type: 'edit',
        icon: <AiOutlineEdit className="context-menu__button--icon" />,
    },
    create: {
        label: "Создать",
        type: 'create',
        icon: <AiOutlinePlus className="context-menu__button--icon" />,
    },
    delete: {
        label: "Удалить",
        type: 'delete',
        icon: <AiFillDelete className="context-menu__button--icon" />,
    },
}

export const contextMenuActions = {
    // For example
    // someaction: {
    //     ...actionsTemplate.someaction,
    //     items: [
    //         {
    //             ...actionsTemplate.someaction,
    //         },
    //         {
    //             ...actionsTemplate.someaction,
    //         },
    //         {
    //             ...actionsTemplate.someaction,
    //         },
    //     ]
    // },


    edit: {
        ...actionsTemplate.edit
    },
    create: {
        ...actionsTemplate.create
    },
    delete: {
        ...actionsTemplate.delete,
    },

}