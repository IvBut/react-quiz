import * as React from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {useState} from "react";
import AuthService, {AUTH_TYPE_SIGN_IN, AUTH_TYPE_SIGN_UP} from "../../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {checkForAuth, makeAuth} from "../../store/actions/actionCreators";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import {AlertContext} from "../../components/UI/Alert/Alert";
import {useContext} from "react";


const Auth = (props) => {

    const isLoading = useSelector(state => state.authReducer.isLoading);
    const credentials = useSelector(state => state.authReducer.credentials);
    const userMessage = useSelector(state => state.authReducer.userMessage);
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();

    const {onShowAlert} = useContext(AlertContext);

    useEffect(() => {
        dispatch(checkForAuth());
    },[]);

    useEffect((prevState) => {
        onShowAlert({type:'success', text: userMessage}, 5000);
    },[userMessage]);

    const [formControls, setFormControls] = useState({
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Enter correct email!',
            valid: true,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Invalid password!',
            valid: true,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        }
    });
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const renderInputs = () => {
       const inputs = Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

           return (
                <Input key={'test -'+index}
                       {...control}
                       shouldValidate={!!control.validation}
                       onChange={(e) => onChangeHandle(e, controlName)}
                />
           )
       });

        return inputs
    };

    const onChangeHandle = (event, controlName) => {

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        let valueForCheck = event.target.value;

        const controls = {...formControls};
        const currentControl = {...controls[controlName]};

        currentControl.value = valueForCheck;
        currentControl.touched = true;
        currentControl.valid = validateControl(currentControl.value, currentControl.validation);

        controls[controlName] = currentControl;

        setReadyToSubmit(isFormValid);
        setFormControls(controls);
    };

    const validateControl = (value, validation) => {
        if (!validation) return true;

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    };

    const handleSignIn = () => {
        dispatch(makeAuth({
            email: formControls.email.value,
            password: formControls.password.value,
            authType: AUTH_TYPE_SIGN_IN
        }));
    };

    const handleSignUp = () => {
        dispatch(makeAuth({
            email: formControls.email.value,
            password: formControls.password.value,
            authType: AUTH_TYPE_SIGN_UP
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {
                !isAuthenticated?
                        <>
                            <div className={classes.Auth}>
                                <form  className={classes.Form} onSubmit={submitHandler}>
                                    <h1>Authorization {userMessage}</h1>
                                    <div className={classes.inputControlsWrapper}>
                                        {renderInputs()}
                                        <div className={classes.btnControlsWrapper}>
                                            <Button type={'success'}
                                                    onClick={handleSignIn}
                                                    disabled={!readyToSubmit}
                                            >
                                                SIGN IN
                                            </Button>
                                            <Button type={'primary'}
                                                    onClick={handleSignUp}
                                                    disabled={!readyToSubmit}
                                            >
                                                SIGN UP
                                            </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            {isLoading && <Spinner />}
                        </>
                    :   <div className={classes.Auth}>
                            <h1>{userMessage}</h1>
                            <h1>{`Session expire in ${transformDate(new Date(credentials.expiresIn).getTime())}`}</h1>
                        </div>
            }

        </>

    );
};

function transformDate(date) {

    let h = new Date(date).getHours();
    let m =  new Date(date).getMinutes();
    let s =  new Date(date).getSeconds();
    return `${h}:${m}:${s}`
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
}


export default Auth