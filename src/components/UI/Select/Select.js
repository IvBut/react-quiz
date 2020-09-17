import React from 'react';
import classes from './Select.module.css';

const Select = (props) => {
    let htmlFor = `${props.label || 'Select'} - ${Math.random()}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label || 'Select'}</label>
            <select id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
            >
                {props.options.map((option,index) => {
                    return (
                            <option value={option.value} key={option.value + index}>{option.text}</option>
                        )
                })}
            </select>
        </div>
    );
};

export default Select;