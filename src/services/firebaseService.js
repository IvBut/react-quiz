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

    static async getAllQuiz(){
        try {
            const {data} = await axios.get(this.endpoint + '/quizes.json');
            let result = [];
            for( const [key ,value] of Object.entries(data)){
                result.push({
                    id: key,
                    ...value
                })
            }
            return  result;
        }catch (e) {
            throw  new Error(e.message)
        }
    }

    static async getQuizById(id){
        const {data} = await axios.get(this.endpoint + `/quizes/${id}.json`);
        return data
    }
}
