import React from 'react';
import Layout from "./HOC/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Redirect, Route, Switch} from "react-router";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import Alert from "./components/UI/Alert/Alert";
import {AlertState} from "./components/UI/Alert/AlertState";
import {useSelector} from "react-redux";


function App() {

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/quiz/:id" component={Quiz}/>
            <Route path="/" component={QuizList}/>
            <Redirect to={'/auth'} />

        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>

                <Route path="/auth" component={Auth}/>
                <Route path="/quiz-creator" component={QuizCreator}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" component={QuizList}/>
                <Redirect to={'/'} />
            </Switch>
        )
    }

  return (
      <Layout>
          <AlertState>
              <Alert/>
              {routes}
          </AlertState>

      </Layout>
  );
}

export default App;
