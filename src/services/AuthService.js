import {APP_CONFIG} from "../appConfig/appConfig";
import  axios from "axios";

export const LOCAL_STORAGE_CREDENTIALS = 'LOCAL_STORAGE_CREDENTIALS';
export const AUTH_TYPE_SIGN_UP = 'AUTH_TYPE_SIGN_UP';
export const AUTH_TYPE_SIGN_IN = 'AUTH_TYPE_SIGN_IN';

class  AuthService {

    static _apiKey = APP_CONFIG.apiKey;


    static async authenticateWithEmailPassword({email, password, authType}) {
        try {
            let endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
            if (authType === AUTH_TYPE_SIGN_UP) {
                endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
            }
            const response = await  axios.post(endPoint, {
                email,
                password,
                returnSecureToken: true
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    key: AuthService._apiKey
                }
            });

            AuthService.setCredentials(response.data);
            return AuthService.credentials;

        }catch (error) {
            let ErrorMsg =  'Something goes wrong! ';

            if (error.response) {
                ErrorMsg = createErrorMessageFromCode(error.response)
            } else if (error.request) {
                ErrorMsg = error.request;
            } else {
                ErrorMsg += error.message
            }
            throw new Error(ErrorMsg);
        }
    }

    static get credentials() {
        const credentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CREDENTIALS));
        if (credentials){
            const expDate = credentials.expiresIn;
            if (!expDate || new Date() > new Date(expDate)) {
                AuthService.logOut();
                return null;
            }
        }
        return credentials;
    }

    static setCredentials(data) {
        if (data) {
            localStorage.setItem(   LOCAL_STORAGE_CREDENTIALS,
                                    JSON.stringify({...data, expiresIn: new Date(new Date().getTime() + +data.expiresIn * 1000)})
            )
        } else {
            localStorage.clear();
        }
    }

    static logOut(){
        AuthService.setCredentials(null);
    }

    static isAuthenticated() {
        return !!AuthService.credentials
    }
}


function createErrorMessageFromCode(response) {
    let result = '';
    let {message} = response.data.error;
    switch (message) {
        case 'EMAIL_EXISTS':
            return result = 'Such user is already registered. Please try another email.';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return result = 'To many attempts! Please try later';
        case 'EMAIL_NOT_FOUND':
            return result = 'Such user is not existed! Please check your email.';
        case 'INVALID_PASSWORD':
            return result = 'Please check your Password!';
        case 'USER_DISABLED':
            return result = 'This account was blocked by administrator';
        case 'INVALID_IDP_RESPONSE':
            return result = 'Your session is over. Please login again';
        case 'INVALID_EMAIL':
            return result = 'Please enter correct email!';
        default:
            return result = 'Something bad happened. Please try again later!';
    }
}

export default AuthService;