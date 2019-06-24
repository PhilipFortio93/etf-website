import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TablePage from './TablePage';
import PrivacyPolicy from './PrivacyPolicy';
import Login from './Login';
import toolpage from './toolpage';
import custompage from './CustomPortfolio';
import etfpage from './etfpage';
import glossary from './components/Glossary';
import etfsearch from './etfsearch';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import "video-react/dist/video-react.css"; // import css
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const hist = createBrowserHistory();

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist} onUpdate={() => window.scrollTo(0, 0)} >
      <Switch>
        <Route
          path='/'
          exact={true}
          component={App}
        />
        <Route
          path='/login'
          exact={true}
          component={Login}
        />
        <Route
          path='/toolpage'
          exact={true}
          component={toolpage}
        />
        <Route
          path='/custompage'
          exact={true}
          component={custompage}
        />
        <Route
          path='/glossary'
          exact={true}
          component={glossary}
        />
        <Route
          path='/etfsearch/:id'
          exact={true}
          component={etfpage}
        />
        <Route
          path='/etfsearch'
          exact={true}
          component={etfsearch}
        />
        <Route
          path='/privacy-policy'
          exact={true}
          component={PrivacyPolicy}
        />
        <Route
          path='/tablepage'
          exact={true}
          component={TablePage}
        />
        <Route render={() => <Redirect to="/"/>}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
