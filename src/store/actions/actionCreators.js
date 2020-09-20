import {FETCH_QUIZES_FAIL, FETCH_QUIZES_STARTED, FETCH_QUIZES_SUCCESS} from "./actionTypes";
import FirebaseService from "../../services/firebaseService";

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
