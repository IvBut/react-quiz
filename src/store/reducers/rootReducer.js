import {combineReducers} from "redux";
import quizListReducer from "./quizListReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    quizListReducer,
    authReducer
});


export default rootReducer
