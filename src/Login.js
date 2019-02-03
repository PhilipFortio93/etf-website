import React from 'react';
import board from './assets/img/board.svg';
import safe from './assets/img/safe.svg';
import key from './assets/img/key.svg';
import './App.css';
import Nav from './components/Nav';
import { Container, Row, Col, Card, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from './components/Button';
import { Player } from 'video-react';
import one from './assets/img/one.png';
import two from './assets/img/two.png';
import three from './assets/img/three.png';
import four from './assets/img/four.png';
import web from './assets/img/web.png';
import web2 from './assets/img/web2.png';
import chooseToken from './assets/img/chooseToken.webp';
import buyAlongside from './assets/img/buyAlongside.webp';
import forgetMiddlemen from './assets/img/forgetMiddlemen.webp';
import regulated from './assets/img/regulated.webp';
import savvy from './assets/img/savvy.png';
import HubspotForm from 'react-hubspot-form';

import tom from './assets/img/tom.webp';
import phil from './assets/img/phil.webp';

import Footer from './components/Footer';
import scale from './assets/img/scale2.png';
import clearingHouse from "./assets/img/clearing-house.png";
import fundAdministrator from "./assets/img/fund-administrator.png";
import fundAuditor from "./assets/img/fund-auditor.png";
import fundCustodian from "./assets/img/fund-custodian.png";
import fundEvaluator from "./assets/img/fund-evaluator.png";
import reconAgent from "./assets/img/recon-agent.png";
import registrar from "./assets/img/registrar.png";
import transferAgent from "./assets/img/transfer-agent.png";
import Vimeo from 'react-vimeo';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  usernameChange(event) {
    this.setState({username: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username);
    alert('Password: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.value} onChange={this.usernameChange} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.value} onChange={this.passwordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="App">
        <Nav {...this.props} />
        <header className="App-header">
          <div class="image">
            <img src={savvy} />
          </div>
          <Container>
            <Row>
              <Col lg={6} xs={12}>
                <h1>
                  TokenBlocks
                </h1>
                <h2>
                  Century <span style={{fontWeight: 900}}>Investing</span>
                </h2>
                <p style={{color: "#031241"}}>
                  Log into 21st century investing
                </p>
                <p>
                  Log in and test the platform yourself.
                  <NameForm />
                </p>
              </Col>
              <Col md={6} xs={12}></Col>
            </Row>
          </Container>
        </header>
        <Footer />
      </div>
    )
  }
}
