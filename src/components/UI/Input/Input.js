import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let cls = [
        classes.Input
    ];

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    let inputType = props.type || 'text';
    let htmlFor = inputType + ' - ' + Math.random();
    let value = props.value;


    return (
        <div className={cls.join(' ')} >
            <label htmlFor={htmlFor}>{props.label || 'Label'}</label>
            <input  id={htmlFor} type={inputType} value={value} onChange={props.onChange}/>
            {
                isInvalid(props) && <span>{props.errorMessage || 'Enter correct value'}</span>
            }

        </div>
    );
};



function isInvalid({valid , touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}




export default Input;