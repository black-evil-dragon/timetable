import React from 'react';

import '@styles/ui/input.scss'

function Input(
    props: {
        className: string,
        type?: string | 'text',
        value?: string,
        onChange?: any,
        placeholder?: string,
        required?: boolean,
    }
) {
    const labelRef = React.useRef<HTMLDivElement>(null)


    const changeFocus = (event: React.FocusEvent, isOut: boolean) => {
        if (props.placeholder && !props.value) {
            !isOut ?
                labelRef.current?.classList.add('moved')
                :
                labelRef.current?.classList.remove('moved')
        }
    }

    return (
        <>
            <div className={`${props.className} input-component`}>
                {props.placeholder &&
                    <span className="label-form" ref={labelRef}>
                        {props.placeholder}
                        {props.required && <span className='required'>*</span>}
                    </span>
                }

                <input
                    type={props.type}
                    value={props.value}
                    onChange={event => props.onChange(event.target.value)}
                    onFocus={event => changeFocus(event, false)}
                    onBlur={event => changeFocus(event, true)}
                />
            </div>
        </>
    );
}

export default Input;