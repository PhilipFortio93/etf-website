import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import HorizontalLoginForm from './components/LoginForm';
import Footer from './components/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';

class App extends Component {
  constructor(){
    super();
  }

  render() {
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



            <HorizontalLoginForm />

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
  deleteItem: id => dispatch(portfolioActions.deleteItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
