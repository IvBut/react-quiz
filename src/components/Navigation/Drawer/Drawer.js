import React from "react";
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";



const Drawer = ({isOpen, onClose}) => {
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

    const cls = [
        classes.Drawer
    ];

    if (!isOpen) {
        cls.push(classes.closed)
    }

    let links = [
        {to: '/', label: 'Home', exact: true},
    ];

    if (isAuthenticated) {
        links = [...links,
            {to: '/auth', label: 'Logout', exact: false},
            {to: '/quiz-creator', label: 'Create quiz', exact: false}
        ]
    } else {
        links = [...links, {to: '/auth', label: 'Sign In', exact: false}]
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