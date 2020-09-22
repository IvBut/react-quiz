import React, {useEffect} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllQuizes} from "../../store/actions/actionCreators";

const QuizList = () => {

    const allQuizList = useSelector(state => state.quizListReducer.allQuizList);
    const isLoading = useSelector(state => state.quizListReducer.loading);
    const dispatch = useDispatch();

    // const [allQuizList, setAllQuizList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //   const fetchData = async () => {
    //       const result = await FirebaseService.getAllQuiz();
    //       setAllQuizList(result);
    //       setIsLoading(false);
    //   };
    //   fetchData();
    // },[]);

    useEffect(()=> {
        dispatch(fetchAllQuizes())
    },[dispatch]);

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
