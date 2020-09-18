import React from "react";
import classes from './Button.module.css'

const Button = (props) => {
    const cls = [
      classes.Button,
      classes[props.type]
    ];

    if (props.disabled) {
        cls.push(classes.disabled);
    }

    return (
        <button disabled={props.disabled || false}
                onClick={props.onClick}
                className={cls.join(' ')}
        >
            {props.children}
        </button>
    )
};

export default Button;