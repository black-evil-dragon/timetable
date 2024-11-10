import React from 'react';

import useInput from '@hooks/useInput';


// import '@styles/ui/input.scss'

type InputProps = {
    onChange: any,

    className?: string,

    type?: string,
    initialValue?: string,

    placeholder?: string,
    required?: boolean,
}


const Input: React.FunctionComponent<InputProps> = ({
    className = '',
    onChange,
    type = 'text',
    initialValue='',
    placeholder = '',
    required = false,
}) => {

    const labelRef = React.useRef<HTMLDivElement>(null)
    const InputHook = useInput({
        initial: initialValue,
        required: required,
    })

    const [value, setValue] = React.useState(initialValue)
    const [focus, setFocus] = React.useState(initialValue ? true : false)


    React.useEffect(() => {
        if (placeholder && !value) {
            focus ?
                labelRef.current?.classList.add('moved')
                :
                labelRef.current?.classList.remove('moved')
        } else if (placeholder && value) {
            labelRef.current?.classList.add('moved')    
        }
    }, [focus])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const new_value = event.target.value


        setValue(new_value)
        onChange(new_value)
    }

    return (
        <>
            <div
                className={`${className} input-component`}
            >
                {placeholder &&
                    <span className="label-form" ref={labelRef}>
                        {placeholder}
                        {required && <span className='required'>*</span>}
                    </span>
                }

                <input
                    type={type}

                    value={value}

                    onChange={handleChange}

                    onBlur={
                        event => {
                            InputHook.onBlur(event)
                            setFocus(false)
                        }
                    }
                    onFocus={event => setFocus(true)}
                />
                {
                    InputHook.error &&
                    <span>
                        {InputHook.error}
                    </span>
                }
            </div>
        </>
    );
}

export default Input;