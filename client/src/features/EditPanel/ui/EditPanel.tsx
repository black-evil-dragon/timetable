import React from "react";

import { Input } from "@shared/Input";
import { EditableField } from "..";

import './edit-panel.scss'


interface EditPanelProps {
    editableFields: EditableField[];

    onSave: (arg: EditableField[]) => void;
}

 
const EditPanel: React.FunctionComponent<EditPanelProps> = ({
    editableFields,
    onSave,
}) => {

    const [fields, setFields] = React.useState<EditableField[]>(editableFields);
    const [editedFields, setEditedFields] = React.useState<EditableField[]>(editableFields);

    const handleChange = (newValue: string, fieldID: number) => {
        const updatedFields = editedFields.map((field, index) =>
            index === fieldID ? { ...field, value: newValue } : field
        );

        setEditedFields(updatedFields);
    };

    const handleSave = () => {
        onSave(editedFields);
    };

    const handleClose = () => {
        onSave(fields)
    }

    return ( 

        <>
        
            <div className={`edit-panel`}>
                <div className="edit-panel__wrapper">
                    <button className="edit-panel__close" onClick={handleClose}>&times;</button>

                    <div className="edit-panel__title">
                        Изменить контент
                    </div>

                    <div className="edit-panel__content">

                        {fields.map((field, fieldIndex) => (

                            <Input key={`editpanel-input-${fieldIndex}`}
                                {...{
                                    initialValue: field.value,
                                    placeholder: field.placeholder,

                                    onChange: (newValue: string) => handleChange(newValue, fieldIndex),
                                }
                                } />

                        ))}

                        <button type="button" onClick={handleSave}>
                            Сохранить
                        </button>

                    </div>
                </div>
            </div>

        </>
    );
}
 
export default EditPanel;