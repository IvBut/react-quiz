import {
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_STARTED,
    AUTH_SUCCESS,
    FETCH_QUIZES_FAIL,
    FETCH_QUIZES_STARTED,
    FETCH_QUIZES_SUCCESS
} from "./actionTypes";
import FirebaseService from "../../services/firebaseService";
import AuthService from "../../services/AuthService";

                        /*Main page actions*/

export const fetchAllQuizes = () => {
  return async dispatch => {
      try {
          dispatch(fetchAllQuizesStarted());
          const result = await FirebaseService.getAllQuiz();
          dispatch(fetchAllQuizesSuccess(result))
      }catch (e) {
          dispatch(fetchAllQuizesFail(e.message))
      }
  }
};


export const fetchAllQuizesStarted = () => {
    return {
        type: FETCH_QUIZES_STARTED,
        payload: {
            loading: true
        }
    }
};


export const fetchAllQuizesSuccess = (result) => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        payload: {
            loading: false,
            allQuizList: result
        }
    }
};

export const fetchAllQuizesFail = (error) => {
    return {
        type: FETCH_QUIZES_FAIL,
        payload: {
            loading: false,
            error
        }
    }
};

                /*Auth page*/

export const makeAuth = (userCreds) => {
    return async dispatch => {
        try {
            dispatch(authStarted());
            const result = await AuthService.authenticateWithEmailPassword(userCreds);
            dispatch(authSuccess(result));
        }catch (e) {
            dispatch(authFailed(e.message));
        }

    }
};

export function authSuccess(credentials) {
    return {
        type: AUTH_SUCCESS,
        payload: {
            credentials,
            userMessage: `You are log in as ${credentials.email}`
        }
    }
}

export function authStarted(){
    return {
        type: AUTH_STARTED
    }
}

export function authFailed(error){
    return {
        type: AUTH_FAIL,
        payload: {
            userMessage: `Error! ${error}`
        }
    }
}

export function authLogout() {
    AuthService.logOut();
    return {
        type: AUTH_LOGOUT
    }
}

export function checkForAuth(){
    return dispatch => {
        let res = AuthService.isAuthenticated();
        console.log('check ',res)
        if (!res) {
            console.log('aa')
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(AuthService.credentials))
        }
    };

}