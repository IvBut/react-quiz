import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Spinner from "../../components/UI/Spinner/Spinner";
import FirebaseService from "../../services/firebaseService";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [],
        quizName: '',
        isLoading: true,
        error: false
    };

    componentDidMount() {
        if (!this.props.location.state) {
            FirebaseService.getQuizById(this.props.match.params.id)
                .then(data => {
                this.setState({
                    ...data,
                    isLoading: false
                })
            })
        } else {
            this.setState(() => {
                return {
                    ...this.props.location.state,
                    isLoading: false
                }
            })
        }
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'Success') {
                return null
            }
        }

        const results = this.state.results;


        const question = this.state.quiz[this.state.activeQuestion];
        if (question.rightAnswerId  === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'Success'
            }

            this.setState({
                answerState: {
                    [answerId]: 'Success'
                },
                results
            });

            const timeout = setTimeout(() => {
                if (this.isQuistionFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState(({activeQuestion}) => ({
                        activeQuestion: ++activeQuestion,
                        answerState: null,
                    }))
                }
                clearTimeout(timeout)
            }, 1000);

        } else {
            results[question.id] = 'Error';
            this.setState({
                answerState: {
                    [answerId]: 'Error'
                },
                results
            });
        }


    };

    handleRestart = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    isQuistionFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <>
                {
                    !this.state.isLoading
                        ? <div className={classes.Quiz}>
                            <div className={classes.QuizWrapper}>
                                {
                                    this.state.error || this.state.quiz.length === 0
                                        ? <h1>{this.state.error || 'Something goes wrong('}</h1>
                                        : [
                                            <h1 key={'name-0'}>{this.state.quizName}</h1>,
                                            (
                                                this.state.isFinished
                                                    ? <FinishedQuiz
                                                        key={'finish-1'}
                                                        results={this.state.results}
                                                        quiz={this.state.quiz}
                                                        onRestart={this.handleRestart}
                                                    />
                                                    : <ActiveQuiz
                                                        key={'active-1'}
                                                        answers={this.state.quiz[this.state.activeQuestion].answers}
                                                        question={this.state.quiz[this.state.activeQuestion].question}
                                                        onAnswerClick={this.onAnswerClickHandler}
                                                        quizLength={this.state.quiz.length}
                                                        answerNumber={this.state.activeQuestion + 1}
                                                        state={this.state.answerState}
                                                    />
                                            )
                                        ]
                                    }
                                </div>
                            </div>
                        : <Spinner/>
                }
            </>
        )
    }
}

export default Quiz;
