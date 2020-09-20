import {APP_CONFIG} from "../appConfig/appConfig";
import  axios from "axios";

class  AuthService {

    static  _authEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken';
    static  _refreshEndpoint = 'https://securetoken.googleapis.com/v1/token';
    static _apiKey = APP_CONFIG.apiKey;

    static async signInWithEmailPassword({email, password}) {
        const response = await  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', {
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
        return response;
    }

    static async signUpWithEmailPassword({email, password}) {
        try {
            const response = await  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
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

        }catch (e) {

        }
    }
}
