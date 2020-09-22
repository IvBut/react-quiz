import {AUTH_FAIL, AUTH_LOGOUT, AUTH_STARTED, AUTH_SUCCESS} from "../actions/actionTypes";


// let initialState = {
//   credentials: AuthService.credentials,
//   isAuthenticated: AuthService.isAuthenticated(),
//   isLoading: false,
//   userMessage: ''
// };
let initialState = {
  credentials: null,
  isAuthenticated: false,
  isLoading: false,
  userMessage: ''
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_STARTED:
            return {
                ...state,
                isLoading: true,
                userMessage: ''
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                credentials: action.payload.credentials,
                isAuthenticated: true,
                isLoading: false,
                userMessage: action.payload.userMessage
            };
        case  AUTH_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                credentials: null,
                userMessage: action.payload.userMessage
            };
        case  AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                credentials: null,
                userMessage: ''
            };
        default: return state;
    }

};



export default authReducer;