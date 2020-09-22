import React, {createContext, useContext} from 'react';
import classes from './Alert.module.css';
import {useSelector} from "react-redux";

export const AlertContext = createContext();

const Alert = () => {
    const text = useSelector(state => state.authReducer.userMessage);

    const {alert} = useContext(AlertContext);
    if (!alert) return null;

    const type = alert.type || 'success';


    const cls = [
        classes.Alert,
        classes[type]
    ];

    return (
        <div className={cls.join(' ')}>
            <p>{text}</p>
        </div>
    );
};

export default Alert;