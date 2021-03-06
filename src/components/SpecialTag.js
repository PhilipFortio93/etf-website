import React from 'react';
import BasicOverview from './BasicOverview';

import {
  Tag, Modal, Spin, Button, message, Tooltip
} from 'antd';
import "antd/dist/antd.css";

import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
var moment = require('moment');

  const nonFailPromise = (promise) => {
    return new Promise((resolve) => {
      promise.then(resolve).catch(resolve);
    })
  }

class SpecialTag extends React.Component {

  constructor(){
    super();
    this.state={
       value:{},
       id:'',
       visible:false,
       loading:false,
       data:{},
       isin:'',
    }
  }




  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  addToPortfolio = (e) => {

    

    this.setState({
      visible: false,

    });

    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description["Bloomberg Ticker"].substr(0,value.description["Bloomberg Ticker"].indexOf(' '));
    })

    let exist = portfolio.indexOf(this.props.etf["Bloomberg Ticker"].substr(0,4).trim())

    if(exist==-1){ // Can't add the same ETF twice to the portfolio
      
      let count = portfolio.length;
      if(count >4){
        message.error("Your account can't have more than 5 ETFs in a portfolio");
      }
      if (count <5){
        this.props.globalLoading(true);
        let today = moment().format("YYYY-MM-DD")
        let etfstring = this.props.etf["Bloomberg Ticker"]
        let selected = etfstring.substr(0,etfstring.indexOf(' '));

        console.log(selected, ' added to portfolio')
      
          Promise.all([
            nonFailPromise(fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/Historical.json', {
                method: 'GET', // or 'PUT'
                // body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json',
                  // 'Access-Control-Allow-Origin':'*'
                }
              })),
            nonFailPromise(fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/Distributions.json', {
              method: 'GET', // or 'PUT'
              // body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*'
              }
            })),
            nonFailPromise(fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/Holdings.json', {
              method: 'GET', // or 'PUT'
              // body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*'
              }
            }))
          ])
          .then(([res1, res2, res3]) => Promise.all([
            nonFailPromise(res1.json()), 
            nonFailPromise(res2.json()),
            nonFailPromise(res3.json())
            ]))
          .then(([data1, data2, data3]) => {
              console.log("got data for ETF")
              this.props.createItem({"description":this.props.etf,"data": data1,"divs":data2, "holdings":data3.slice(1,data3.length)});
              this.props.globalLoading(false);


            }
          );
              let route = {
                pathname:"/custompage"
              }
              console.log(this.props)
              // this.props.history.push(route)
      }
    }
    else{
      message.error("This ETF is alrady in your portfolio!");
    }
    
  }

  deleteFromPortfolio = (e) => {
    this.setState({
      visible: false,
    });
    let etfstring = this.props.etf["Bloomberg Ticker"]
    console.log(etfstring.substr(0,etfstring.indexOf(' ')), ' removed from portfolio')
    console.log(this.props.etf);
    this.props.deleteItem(this.props.etf);
  }

  componentWillReceiveProps(newProps) {
    // console.log('props:', newProps)
    if(newProps.etf !== this.props.etf) {
      // console.log(newProps)
      // console.log(newProps.etf["Bloomberg Ticker"]);
      let newetfstring = newProps.etf["Bloomberg Ticker"]
      // console.log(newetfstring.indexOf(' '))

      if(newProps.etf["Bloomberg Ticker"]){
        this.setState({
          value: newProps.etf,
          id: newetfstring.substr(0,newetfstring.indexOf(' '))
        });
      }


    }
    // let etfstring = this.props.etf["Bloomberg Ticker"]
    // let newetfstring = newProps.etf["Bloomberg Ticker"]
    //  if(newetfstring.substr(0,newetfstring.indexOf(' ')) !== etfstring.substr(0,etfstring.indexOf(' '))) {
    //   this.setState({id: newetfstring.substr(0,newetfstring.indexOf(' '))});
    // }
  }

  componentDidMount(){
    // console.log(this.props.etf["Bloomberg Ticker"]);
    let etfstring = this.props.etf["Bloomberg Ticker"]
    if(etfstring){
       this.setState({value:this.props.etf,isin:this.props.etf['ISIN'], id:etfstring.substr(0,etfstring.indexOf(' '))})
    }
    else{
      this.setState({value:this.props.etf,isin:this.props.etf['ISIN']})
    }
   

  }

  render(){
    let value = this.state.value;
    let id = this.state.id;
    let ISIN = this.state.isin;
    let fee = parseFloat(value["Total Expense Ratio"])*250;
    let red = 66+fee;
    let blue = 244-fee;
    let colourstring = "rgb("+red+",66,"+blue+")";


    let portfolioredux = this.props.portfolioredux;
    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description;
    })

    let exist = portfolio.indexOf(value) == -1 ? false : true
    let portfolioButton;

    if (exist){
      portfolioButton = <Button style={{width:"36%", marginRight:"2%"}} key="back" type="primary"onClick={this.deleteFromPortfolio}>Remove from Portfolio?</Button>
    }
    else{
      portfolioButton = <Button style={{width:"36%", marginRight:"2%"}} key="back" type="primary"onClick={this.addToPortfolio}>Add to Portfolio?</Button>
    }

    return(
      <>  
              <Modal
                title={"Basic Overview: " + value["Long Name"]}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button style={{width:"20%"}} key="back" type="primary"onClick={this.handleCancel}>Close</Button>,
                  portfolioButton,

                  <Link to={{
                      pathname:"/etfsearch/"+id,
                      state:{
                         etf:value,
                         isin:ISIN,
                      }
                    }}>
                    <Button style={{width:"36%"}} key="submit" type="primary" onClick={this.handleOk}>
                      Find Out More?
                    </Button>

                  </Link>,
                ]}

              >
              <Spin tip="Getting Data..." size="large" spinning={this.state.loading}>
                <BasicOverview etf={this.state.value} />
              </Spin>
              </Modal>

          <Tag color={colourstring} value={value["Bloomberg Ticker"]} onClick={this.showModal}>
            {value["Bloomberg Ticker"]}
          </Tag>

             {/*}
        <Link to={"/etfsearch/"+id}>
          <Tag color="magenta" value={value["Bloomberg Ticker"]}>
            {value["Bloomberg Ticker"]}
          </Tag>
        </Link>
      */}
      </>
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
)(SpecialTag);
