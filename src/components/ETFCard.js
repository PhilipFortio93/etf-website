import React from 'react';
import BasicOverview from './BasicOverview';

import {
  Tag, Modal, Spin, Button, message, Card
} from 'antd';
import "antd/dist/antd.css";

import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
var moment = require('moment');

  
class ETFCard extends React.Component {

  constructor(){
    super();
    this.state={
       value:{},
       id:'',
       visible:false,
       loading:false,
       data:{},
    }
  }




  componentWillReceiveProps(newProps) {
    // if(newProps.etf !== this.props.etf) {
    //   this.setState({value: newProps.etf});
    // }
    //  if(newProps.etf["Bloomberg Ticker"].substr(0,4).trim() !== this.props.etf["Bloomberg Ticker"].substr(0,4).trim()) {
    //   this.setState({id: newProps.etf["Bloomberg Ticker"].substr(0,4).trim()});
    // }
  }

  componentDidMount(){
    // console.log(this.props.etf["Bloomberg Ticker"]);
    // if(this.props.etf["Bloomberg Ticker"]){
    //    this.setState({value:this.props.etf, id:this.props.etf["Bloomberg Ticker"].substr(0,4).trim()})
    // }
    // else{
    //   this.setState({value:this.props.etf})
    // }
    

  }

  render(){


    return(
        <Card>
          Some Data
         </Card>
    )

  }
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: (item)=> dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  globalLoading: loading => dispatch(portfolioActions.globalLoading(loading))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ETFCard);
