import React from 'react';

// import '@styles/ui/button.scss'


type ButtonProps = {
    type?: "submit" | "reset" | "button",
    className?: string,

    children?: React.ReactNode;

    callback: any,
}

const Button: React.FunctionComponent<ButtonProps> = ({
    type='button',
    className='',

    children,

    callback,
}) => {
    return ( 
        <>
            <button
                className={`button-component ${className}`}
                type={type}
                onClick={event => callback(event)}
            >
                {children}
            </button>
        </>
    );
}

export default Button;