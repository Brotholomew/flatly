import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "store";
import 'react-loading-skeleton/dist/skeleton.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SuperWrapper from "./components/containers/superWrapper/SuperWrapper";

library.add(fas);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <SuperWrapper/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
