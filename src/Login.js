import React from 'react';
import './App.css';
import Nav from './components/Nav';
import { Container, Row, Col} from 'reactstrap';
import Footer from './components/Footer';



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

          </div>
          <Container>
            <Row>
              <Col lg={6} xs={12}>
                <h1>
                  Torch
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
