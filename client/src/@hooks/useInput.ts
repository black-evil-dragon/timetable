import React from "react";

type useInputProps = {
    initial: string,
    required?: boolean
};

const useInput = (props: useInputProps) => {
    const [value, setValue] = React.useState(props.initial);
    const [error, setError] = React.useState("");

    const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        // ...

        if (!event.target.value && props.required) {
            setError("Обязательное поле!");
        }
        else {
            setError('');
        }
    }

    const onChange = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        // ...

        setValue(event.target.value)
    }


    return {
        value,
        onBlur,
        onChange,
        error,
    };
};

export default useInput;
