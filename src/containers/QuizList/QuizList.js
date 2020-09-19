import React, {useEffect, useState} from 'react';
import classes from './QuizList.module.css';
import {NavLink, useHistory} from "react-router-dom";
import FirebaseService from "../../services/firebaseService";
import Spinner from "../../components/UI/Spinner/Spinner";

const QuizList = (props) => {

    const [allQuizList, setAllQuizList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
          const result = await FirebaseService.getAllQuiz();
          setAllQuizList(result);
          setIsLoading(false);
      };
      fetchData();
    },[]);

    const renderQuizes = () => {
        return allQuizList.map((quiz, index) => {
            return (
                <li key={index}>
                     <NavLink to={{pathname: `/quiz/${quiz.id}`, state: {...allQuizList[index]}}}  >{quiz.quizName}</NavLink>
                 </li>
            )
        })
    };


    return (
        <>
            {
                !isLoading ?
                    <div className={classes.QuizList}>
                        <h1>All available tests</h1>
                        <ul>
                            {renderQuizes()}
                        </ul>
                    </div>
                    : <Spinner/>
            }
        </>

    );
};

export default QuizList;
