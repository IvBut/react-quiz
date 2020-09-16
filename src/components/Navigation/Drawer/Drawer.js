import React from "react";
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label: 'Home', exact: true},
    {to: '/auth', label: 'Sing in', exact: false},
    {to: '/quiz-creator', label: 'Create quiz', exact: false},
];

const Drawer = ({isOpen, onClose}) => {

    const cls = [
        classes.Drawer
    ];

    if (!isOpen) {
        cls.push(classes.closed)
    }

    const renderLinks = () => {
        return links.map((link, index) => (
            <li key={index} onClick={onClose}>
                <NavLink exact={link.exact}
                         activeClassName={classes.active}
                         to={link.to}
                >
                    {link.label}
                </NavLink>
            </li>

        ))
    };


    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
            <Backdrop isOpen={isOpen} onBackdropClick={onClose}/>
        </>
    )
};

export default Drawer