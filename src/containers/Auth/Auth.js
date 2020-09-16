import * as React from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {useState} from "react";


const Auth = (props) => {

    const [inpValue, setInpValue] = useState('');

    const handleSignIn = () => {

    };

    const handleSignUp = () => {

    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className={classes.Auth}>
            <form action="" className={classes.Form} onSubmit={submitHandler}>
                <h1>Authorization</h1>
                <div className={classes.inputControlsWrapper}>

                    <Input label={'Email'}
                           value={inpValue}
                           onChange={(e)=> {setInpValue(e.target.value)}}
                    />
                    <Input label={'Password'}
                           type={'date'}
                           value={inpValue}
                           onChange={(e)=> {setInpValue(e.target.value)}}
                    />

                    <div className={classes.btnControlsWrapper}>
                        <Button type={'success'}
                                onClick={handleSignIn}
                        >
                            SIGN IN
                        </Button>
                        <Button type={'primary'}
                                onClick={handleSignUp}
                        >
                            SIGN UP
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Auth