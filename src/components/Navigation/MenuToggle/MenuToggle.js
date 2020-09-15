import React from "react";
import classes from './MenuToggle.module.css'

const MenuToggle = ({isOpen, onToggle}) => {
    const cls =[
        classes.MenuToggle,
        'fa'
    ];

    isOpen ? cls.push('fa-times', classes.open) : cls.push('fa-bars');
    return (
        <i className={cls.join(' ')}
            onClick={onToggle}
        >
        </i>
    )
};

export default MenuToggle;