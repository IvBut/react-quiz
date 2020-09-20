import {FETCH_QUIZES_FAIL, FETCH_QUIZES_STARTED, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

let initialState = {
    allQuizList: [],
    loading: true,
    error: ''
};

const quizListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZES_STARTED :
            return {
                ...state,
                loading: action.payload.loading
            };
        case FETCH_QUIZES_SUCCESS :
            return {
                ...state,
                loading: action.payload.loading,
                allQuizList: action.payload.allQuizList
            };
        case FETCH_QUIZES_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error
            };

        default:
            return state;
    }

};


export default  quizListReducer;
