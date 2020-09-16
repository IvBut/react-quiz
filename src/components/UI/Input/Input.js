import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let cls = [
        classes.Input
    ];

    let inputType = props.type || 'text';
    let htmlFor = inputType + ' - ' + Math.random();
    let value = props.value;


    return (
        <div className={cls.join(' ')} >
            <label htmlFor={htmlFor}>{props.label || 'Label'}</label>
            <input  id={htmlFor} type={inputType} value={value} onChange={props.onChange}/>
            <span className="errorMessage">{props.errorMessage}</span>
        </div>
    );
};

export default Input;