import React from "react";

import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers/timeViewRenderers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";


import { Input } from "@shared/Input";
import { EditableField } from "..";

import './edit-panel.scss'
import dayjs from "dayjs";



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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {fields.map((field, fieldIndex) => (

                                !field.type ?
                                    <Input key={`editpanel-input-${fieldIndex}`}
                                        className="edit-panel__field"
                                        {...{
                                            initialValue: field.value,
                                            placeholder: field.placeholder,

                                            onChange: (newValue: string) => handleChange(newValue, fieldIndex),
                                        }
                                        }
                                    />
                                : field.type === 'time' ?
                                        <TimePicker
                                            className="edit-panel__field"
                                            key={`editpanel-input-${fieldIndex}`}
                                            label={field.placeholder}
                                            onChange={(newTime) => handleChange(`${("0" + newTime?.hour()).slice(-2)}:${("0" + newTime?.minute()).slice(-2)}`, fieldIndex)}
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                            defaultValue={dayjs(`2024T${field.value}`)}
                                            ampm={false}
                                        />
                                    :
                                    <>
                                        Not yet
                                    </>

                            ))}
                        </LocalizationProvider>

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