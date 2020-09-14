import React from "react";
import classes from './FinishedQuiz.module.css'

const FinishedQuis = (props) => {
    console.log(props)
  const succesCount = Object.keys(props.results).filter(item => props.results[item] === 'Success').length;

  return (
      <div className={classes.FinishedQuiz}>
          <ul>
              {
                  props.quiz.map((quizItem,index) => {
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
              {/*<li>*/}
              {/*    <strong>1.</strong>*/}
              {/*    <i className={'fa fa-times'}/>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*    <strong>2.</strong>*/}
              {/*    <i className={'fa fa-check'}/>*/}
              {/*</li>*/}
          </ul>
          <p>Correct answers {succesCount} from {props.quiz.length}</p>
          <div>
              <button onClick={props.onRestart}>Restart</button>
          </div>
      </div>
  )
};

export default FinishedQuis;