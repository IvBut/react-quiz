import React from "react";
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1,2,3];

const Drawer = ({isOpen, onClose}) => {

    const cls = [
        classes.Drawer
    ];

    if (!isOpen) {
        cls.push(classes.closed)
    }

    const renderLinks = () => {
      return links.map((link,index) => (<li key={index}><a href="#">Link {link}</a></li>))
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