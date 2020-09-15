import React from "react";
import classes from './Backdrop.module.css';

const Backdrop = ({isOpen, onBackdropClick}) => {
    return (
        isOpen &&
        <div className={classes.Backdrop} onClick={onBackdropClick}>
        </div>
    )


};


export default Backdrop;