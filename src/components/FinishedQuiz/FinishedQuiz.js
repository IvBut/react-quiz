import React from "react";
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
import {useHistory} from 'react-router-dom'

const FinishedQuis = (props) => {

    let history = useHistory();
    console.log(history)

    const succesCount = Object.keys(props.results).filter(item => props.results[item] === 'Success').length;

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'Error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ];
                        return (
                            <li key={index}>
                                <strong>{index + 1}</strong>. &nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>
            <p>Correct answers {succesCount} from {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRestart}
                        type={'primary'}
                >
                    RESTART
                </Button>
                <Button
                    type={'succes'}
                    onClick={() => history.push('/')}
                >
                    GO TO TESTS
                </Button>
            </div>
        </div>
    )
};

export default FinishedQuis;