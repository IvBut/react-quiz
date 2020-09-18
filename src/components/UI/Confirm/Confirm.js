import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Confirm.module.css"
import Button from "../Button/Button";

const Confirm = ({showConfirm, onPressOk, onPressCancel, title = 'Do you confirm changes?', children}) => {

    return (
        showConfirm &&
        <>
            <Backdrop isOpen={showConfirm} onBackdropClick={onPressCancel}/>
            <div className={classes.Confirm}>
                <h1>{title}</h1>
                {children && <div>{children}</div>}
                <div className={classes.controlsWrapper}>
                    <Button type="primary" onClick={onPressCancel}>Cancel</Button>
                    <Button type="error" onClick={onPressOk}>OK</Button>
                </div>
            </div>
        </>
    );
};

export default Confirm;