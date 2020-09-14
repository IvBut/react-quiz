import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [
            {
                id: 1,
                question: 'What is React?',
                rightAnswerId: 1,
                answers: [
                    {text: 'Library', id: 1},
                    {text: 'Framework', id: 2},
                    {text: 'Nothing', id: 3},
                    {text: 'Question 1', id: 4},
                ]
            },
            {
                id: 2,
                question: 'What is Angular?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Library', id: 1},
                    {text: 'Framework', id: 2},
                    {text: 'Nothing', id: 3},
                    {text: 'Question 1', id: 4},
                ]
            }
        ]
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'Success') {
                return null
            }
        }

        const results = this.state.results;


        const question = this.state.quiz[this.state.activeQuestion];
        if (question.rightAnswerId === answerId) {

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
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Choose answers for this quiz!</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRestart={this.handleRestart}
                                />
                            : <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                          question={this.state.quiz[this.state.activeQuestion].question}
                                          onAnswerClick={this.onAnswerClickHandler}
                                          quizLength={this.state.quiz.length}
                                          answerNumber={this.state.activeQuestion + 1}
                                          state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz;
