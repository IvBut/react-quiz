import React from "react";
import classes from './AnswerItem.module.css'

const AnswerItem = ({answer, onItemClick, state}) => {
    const styleClasses = [classes.AnswerItem];


    if (state) {
        styleClasses.push(classes[state]);
    }

    return (
        <li className={styleClasses.join(' ')} onClick={()=> onItemClick(answer.id)}>
            {answer.text}
        </li>
    )
};


export default AnswerItem;
