import React, { Component } from 'react';
import io from 'socket.io-client'
import FontAwesome from 'react-fontawesome'
import './App.css';
import Nav from './components/Nav';
import { Icon, Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import HorizontalLoginForm from './components/LoginForm';
import Footer from './components/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import { Auth, Hub } from 'aws-amplify'



class App extends Component {
  constructor(){
    super();
    this.state={
      user: {},
      disabled: ''
    }
    this.popup = null  
  }

  componentDidMount(){
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          // console.log(signIn)
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });

     Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ user });
        this.props.userlogin({user})
      })
      .catch(() => console.log("Not signed in"));
    

  }


  render() {



    console.log(this.state.user)

    function checkUser() {
      Auth.currentAuthenticatedUser()
        .then(user => console.log({ user }))
        .catch(err => console.log(err))
    }

    function signOut() {
      Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    function signIn() {
      Auth.federatedSignIn()
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
      <div className="App">
        <Nav {...this.props} />
          <header className="App-header" style={{marginTop:"-8%"}}>
            <Icon type="line-chart" style={{fontSize:"128px", padding:"2%"}} />
             <p>
              Learn how to invest and build a portfolio tailored to <code><Link to="/custompage">your</Link></code> needs.
            </p>
            <p>
              <code><Link to="/etfsearch">Search</Link></code>  our database of ETFs. There's an ETF for almost everything from robotics and AI to ESG.
            </p>

            <p>
              See the top performers of the week, be notified of new releases and dividends.
            </p>

            <p>
              Or explore some of the <code><Link to="/etfsearch">detail</Link></code> behind different ETF investments.
            </p>
            <Row>
              <Button type="primary" onClick={signIn}>Sign In</Button>
              <Button type="primary" onClick={signOut}>Sign Out</Button>
            </Row>
          </header>
        <Footer />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  userlogin: user => dispatch(portfolioActions.userlogin(user)),
  userlogout: user => dispatch(portfolioActions.userlogout(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
