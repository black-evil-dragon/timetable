import useInput from '@hooks/useInput';
import React from 'react';

// import '@styles/ui/input.scss'

type InputProps = {
    className?: string,
    onChange: any,

    type?: string,
    value?: string,

    placeholder?: string,
    required?: boolean,
}


const Input: React.FunctionComponent<InputProps> = ({
    className = '',
    onChange,
    type = 'text',
    value = '',
    placeholder = '',
    required = false,
}) => {

    const labelRef = React.useRef<HTMLDivElement>(null)
    const InputHook = useInput({
        initial: value,
        required: required,
    })


    const changeFocus = (isOut: boolean) => {
        if (placeholder && !value) {
            !isOut ?
                labelRef.current?.classList.add('moved')
                :
                labelRef.current?.classList.remove('moved')
        }
    }

    return (
        <>
            <div
                className={`${className} input-component`}>
                {placeholder &&
                    <span className="label-form" ref={labelRef}>
                        {placeholder}
                        {required && <span className='required'>*</span>}
                    </span>
                }

                <input
                    type={type}

                    value={InputHook.value}

                    onChange={
                        event => {
                            onChange(event.target.value)
                        }
                    }

                    onBlur={
                        event => {
                            InputHook.onBlur(event)
                            changeFocus(true)
                        }
                    }
                    onFocus={event => changeFocus(false)}
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