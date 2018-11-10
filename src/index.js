import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Demo from './Demo';
import Investors from './Investors';
import PrivacyPolicy from './PrivacyPolicy';
import Standard from './Standard';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import "video-react/dist/video-react.css"; // import css
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist} onUpdate={() => window.scrollTo(0, 0)} >
    <Switch>
      <Route
        path='/'
        exact={true}
        component={App}
      />
      <Route
        path='/investors'
        exact={true}
        component={Investors}
      />
      <Route
        path='/privacy-policy'
        exact={true}
        component={PrivacyPolicy}
      />
      <Route
        path='/standard'
        exact={true}
        component={Standard}
      />
      <Route
        path='/demo'
        exact={true}
        component={Demo}
      />
      <Route render={() => <Redirect to="/"/>}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
