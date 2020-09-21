import React, {createContext, useContext} from 'react';
import classes from './Alert.module.css';

export const AlertContext = createContext();

const Alert = () => {
    const {alert} = useContext(AlertContext);
    if (!alert) return null;

    const type = alert.type || 'success';
    const text = alert.text;

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