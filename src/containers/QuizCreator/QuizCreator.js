import React, {useMemo, useState} from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

function createOptionControl(number){
    return createControl
    (
        {label: `Option ${number}`, errorMessage: 'Value cant be empty!', id: number , shouldValidate: true, value: ''},
        {required: true}
    )
}

function createFormControls(){
    return {
        question: createControl(
            {label: 'Enter question', errorMessage: 'Question must be filled', shouldValidate:true, value:''},
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
    const [test, setTest] = useState('');

    console.log(formControls)
    const submitHandler = (e) => {
        e.preventDefault();
    };

    const addQuestionHandler = () => {
        console.log(formControls)
    };

    const addQuizHandler = () => {

    };


    const renderControls = () => {
        return Object.keys(formControls).map((controlName, index) => {
            let control = formControls[controlName];
            return (
                <Input /*key={`${controlName}-${Math.random()}`}*/
                        key={Math.random()}
                    // key={`${controlName}`}
                       label={control.label}
                       value={control.value}
                       valid={control.valid}
                       shouldValidate={control.shouldValidate}
                       touched={control.touched}
                       errorMessage={control.errorMessage}
                       onChange={(e) => handleValidate(e.target.value, controlName)}
                />
                // <>
                //     <input type="text" value={control.value} onChange={(e) => handleValidate(e.target.value, controlName)}/>
                // </>
            )
        })

        // return ( <Input value={test} onChange={(e) => handleValidate(e.target.value)}/>)
    };

    const memo = useMemo(() => renderControls(),[formControls]);

    const handleValidate = (value, controlName) => {

        const formControlsToUpdate = {...formControls};
        const currentControl = {...formControlsToUpdate[controlName]};
        //
        currentControl.value = value;
        // currentControl.touched = true;
        // currentControl.valid = validate(value, currentControl.validation);
        //
        formControlsToUpdate[controlName] = currentControl;
        setFormControls(formControlsToUpdate);

        // setTest(value)

    };

    const selectChangeHandler = (e) => {
        setRightAnswerId(+e.target.value);
    };


    return (
        <div className={classes.QuizCreator}>
            <form className={classes.Form} onSubmit={submitHandler}>
                <h1>Creator</h1>
                <div className={classes.ControlsWrapper}>
                    {memo}
                    <Select label={'Quiz test'}
                            options={[
                                {text: 1 , value: 1},
                                {text: 2 , value: 2},
                                {text: 3 , value: 3},
                                {text: 4 , value: 4}
                                ]}
                            value={rightAnswerId}
                            onChange={selectChangeHandler}
                    />
                </div>

                <div style={{textAlign:"center", margin: '1rem auto'}}>
                    <Button type="primary"
                            onClick={addQuestionHandler}
                    >
                        Add question
                    </Button>
                    <Button type="success"
                            onClick={addQuizHandler}
                    >
                        Create Test
                    </Button>
                </div>
            </form>

        </div>
    );
};

export default QuizCreator;
