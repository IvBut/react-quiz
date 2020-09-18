import {APP_CONFIG} from "../appConfig/appConfig";
import  axios from "axios";


export default class FirebaseService {
    static endpoint = APP_CONFIG.databaseURL;

    static async createQuiz(quiz) {
      try {
          const response = await axios.post(FirebaseService.endpoint + '/quizes.json', quiz);
          const {data} = response;
          return  data;
      }catch (e) {
          throw new Error(e.message);
      }

    }
}