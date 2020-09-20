import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";


const Application = (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter >
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(
  Application,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
