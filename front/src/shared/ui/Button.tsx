import React from 'react';

// import '@styles/ui/button.scss'


type ButtonProps = {
    type: "submit" | "reset" | "button",
    className?: string,
    text?: string,

    callback: any,
}

const Button: React.FunctionComponent<ButtonProps> = ({
    type = 'button',
    className='',
    text,

    callback,
}) => {
    return ( 
        <>
            <button
                className={`button-component ${className}`}
                type={type}
                onClick={event => callback(event)}
            >
                {text}
            </button>
        </>
    );
}

export default Button;