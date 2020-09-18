import React, {useEffect, useMemo, useState} from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import FirebaseService from "../../services/firebaseService";
import Confirm from "../../components/UI/Confirm/Confirm";
import {withInputShowConfirm} from "../../HOC/withInputShowConfirm/withInputShowConfirm";

function createOptionControl(number) {
    return createControl
    (
        {label: `Option ${number}`, errorMessage: 'Value cant be empty!', id: number, shouldValidate: true, value: ''},
        {required: true}
    )
}

function createFormControls() {
    return {
        question: createControl(
            {label: 'Enter question', errorMessage: 'Question must be filled', shouldValidate: true, value: ''},
            {required: true}
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),

    }
}

const QuizCreator = () => {


    const [quiz, setQuiz] = useState([]);
    const [formControls, setFormControls] = useState(createFormControls());
    const [rightAnswerId, setRightAnswerId] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    useEffect(() => {
        setIsFormValid(validateForm(formControls));
    }, [formControls]);


    const submitHandler = (e) => {
        e.preventDefault();
    };

    const addQuestionHandler = () => {
        const quizListToAdd = [...quiz];
        const index = quiz.length + 1;
        const questionItem = {
            question: formControls.question.value,
            id: index,
            rightAnswerId,
            answers: Object.keys(formControls).filter(key => key !== 'question').map(key => {
                return {
                    text: formControls[key].value,
                    id: formControls[key].id
                }
            })
        };
        quizListToAdd.push(questionItem);
        setQuiz(quizListToAdd);
        setFormControls(createFormControls());
        setRightAnswerId(0);
    };

    const addQuizHandler = () => {
        setShowConfirm(true);
        // FirebaseService.createQuiz(quiz)
        //     .then(resp => {
        //         setQuiz([]);
        //         setRightAnswerId(0);
        //         console.log(resp);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    };

    const handleAddQuizToFirebase = (quizName) => {
        console.log(quizName)
        setShowConfirm(false)
    };

    const renderControls = useMemo(() => {
        return Object.keys(formControls).map((controlName, index) => {
            let control = formControls[controlName];
            return (
                <Input
                    key={`${controlName}-` + index}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={control.shouldValidate}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={(e) => handleValidate(e.target.value, controlName)}
                />
            )
        })
    }, [formControls]);


    const handleValidate = (value, controlName) => {

        const formControlsToUpdate = {...formControls};
        const currentControl = {...formControlsToUpdate[controlName]};

        currentControl.value = value;
        currentControl.touched = true;
        currentControl.valid = validate(value, currentControl.validation);

        formControlsToUpdate[controlName] = currentControl;

        setFormControls(formControlsToUpdate);
    };

    const selectChangeHandler = (e) => {
        setRightAnswerId(+e.target.value);
    };

    const ShowConfirmWithInput = withInputShowConfirm(Confirm);

    return (
        <>
            <div className={classes.QuizCreator}>
                <form className={classes.Form} onSubmit={submitHandler}>
                    <h1>Creator</h1>
                    <div className={classes.ControlsWrapper}>
                        {renderControls}
                        <Select label={'Quiz test'}
                                options={[
                                    {text: 1, value: 1},
                                    {text: 2, value: 2},
                                    {text: 3, value: 3},
                                    {text: 4, value: 4}
                                ]}
                                value={rightAnswerId}
                                onChange={selectChangeHandler}
                        />
                    </div>

                    <div style={{textAlign: "center", margin: '1rem auto'}}>
                        <Button type="primary"
                                onClick={addQuestionHandler}
                                disabled={!isFormValid}
                        >
                            Add question
                        </Button>
                        <Button type="success"
                                onClick={addQuizHandler}
                                disabled={quiz.length === 0}
                        >
                            Create Test
                        </Button>
                    </div>
                </form>
            </div>
            {/*<Confirm title={'Are you shure?'} showConfirm={showConfirm} onPressCancel={() => setShowConfirm(false)}/>*/}
            <ShowConfirmWithInput
                label={'Write Quiz name'}
                title={'Are you shure?'}
                showConfirm={showConfirm}
                onPressCancel={() => setShowConfirm(false)}
                onAttachData={handleAddQuizToFirebase}
            />
        </>

    );
};

export default QuizCreator;
