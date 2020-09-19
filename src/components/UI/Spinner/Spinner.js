import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import classes from './Spinner.module.css'

const Spinner = () => {
    const cls = [
        classes.LdsSpinner
    ];

    return (
        <>
            <Backdrop isOpen={true}/>
            <div className={classes.SpinnerWrapper}>
                <div className={cls.join(' ')}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>

        </>
    );
};

export default Spinner;
