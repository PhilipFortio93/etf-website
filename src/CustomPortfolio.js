import React from 'react';
import Nav from './components/Nav';  
import Footer from './components/Footer';
import StatsComponent from './components/statscomponent';
import CustomCarousel from './components/CustomCarousel';
import PortfolioStateComponent from './components/portfolio_stats_comp';
import TutorialModal from './components/TutorialModal';
import Glossary from './components/Glossary';
import PortfolioSlider from './components/PortfolioSlider';
import PlatformFees from './components/PlatformFees';
import {Container} from 'reactstrap';
import DailyReturns from './tooldata/DailyReturns.json';
import {Line, Bar} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import SpecialTag from './components/SpecialTag';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
  Slider, InputNumber, Row, Col, Tooltip, Modal, Button, Collapse, Icon, Popover,Radio, Card, Steps, Drawer, Input, Form, Spin, message
} from 'antd';
// import etf_list from './tooldata/ETF_List.json';
import "antd/dist/antd.css";
import "./toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';
import {standardDeviation,average,getReturn, getCashReturn,portfolioreturn,stringToDate,stringToDateMapper} from './components/mathsfunctions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import _ from "lodash";
import "./CustomPortfolio.css";
import StepWizard from 'react-step-wizard';
var AWS = require('aws-sdk'); 
var moment = require('moment');

AWS.config.update({
  region: 'eu-west-2'
});
var s3 = new AWS.S3();



var MediaQuery = require('react-responsive');

const Step = Steps.Step;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const text ='hello';

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


class PortfolioTool extends React.Component {



  constructor() {
    super();

    this.state = {
      notional:10000,
      alldata:[],
      startDate:new Date(2015,0,1),
      endDate:new Date(),
      portfolioweights:{
        ISFweight: 0.25,
        SLXXweight: 0.25,
      },
      portfolio:"ISF",
      screenWidth: null,
      visibledrawer: false,
      platform: 1,
      visible:false,
      portfolioName:'',
      searchval:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onTimePeriodChange = this.onTimePeriodChange.bind(this);
    this.onRPChange = this.onRPChange.bind(this);
    this.infoclick = this.infoclick.bind(this);
    this.onPlatformChange = this.onPlatformChange.bind(this);
    this.addETF = this.addETF.bind(this);
    this.updatePortfolioName = this.updatePortfolioName.bind(this);
    this.newPortfolio = this.newPortfolio.bind(this);
  }
  
  componentDidMount(){
    
    window.addEventListener("resize", this.updateWindowDimensions());

    let overviewall = this.props.alloverviewdata.length;

    // if(!overviewall){
    //   console.log("we're getting all the data");
    //   this.props.globalLoading(true);

    //   fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/alloverview', {
    //     method: 'GET', // or 'PUT'
    //     // body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers:{
    //       'Content-Type': 'application/json',
    //       // 'Access-Control-Allow-Origin':'*'
    //     }
    //   }).then(res => res.json())
    //   .then(res => {
    //     this.props.loadalloverview(res);
    //     this.props.globalLoading(false);
    //     })
    //   .catch(error => console.error('Error:', error));
    //   }
    if(!overviewall){

      console.log("we're getting all the data");
      this.props.globalLoading(true);

      let today = moment().format("YYYY-MM-DD")

      fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/AllOverviews.json', {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          'mode':'no-cors',
          'Access-Control-Allow-Origin':'*'
        }
      }).then(res => res.json())
      .then(res => {
        this.props.loadalloverview(res);
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));
    }

    }



  updateWindowDimensions() {
   this.setState({ screenWidth: window.innerWidth });
  }

  updatePortfolioName(event){

    this.setState({portfolioName:event.target.value})
  }

  handleChange(event) {
    this.setState({notional: event.target.value});
    event.preventDefault();
  }
  onRPChange(e){
  }

  handleOk = (e) => {

    this.setState({
      visible: false
    });

    
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });

  }

  infoclick(e){
    this.setState({
      visibledrawer:true
    })
  }

  onPlatformChange(e){
    this.setState({
      platform:e.target.value
    })
  }

  onTimePeriodChange(e){

     let today = new Date();
     let year = today.getFullYear();
     let month = today.getMonth()-e.target.value;
     let day = today.getDay();
     this.setState({
         startDate:new Date(year,month,day),
         endDate: today
     })
  
  }

  handleDateChange(event){
     this.setState({startDate: event});
  }

  handleEndDateChange(event){
    this.setState({endDate: event});
  }


  addETF(){

    this.setState({
      visible: true,
    });
  }

  newPortfolio(){

       this.props.globalLoading(true);
       let selected = "ISF";
       Promise.all([
          fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/historical?etf-id='+selected, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              // 'Access-Control-Allow-Origin':'*'
            }
          }),
          fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/dividends?etf-id='+selected, {
              method: 'GET', // or 'PUT'
              // body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*'
              }
            }),
          fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected, {
              method: 'GET', // or 'PUT'
              // body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*'
              }
            })
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => {
            this.props.createItem({"description":data3,"data": data1,"divs":data2});
            this.props.globalLoading(false);
          }
        );
  }

  render() {
    //const slxx = slxxdata;
    let notional = this.state.notional;
    let DataSet = this.state.alldata;
    let startDate = this.state.startDate;

    let endDate = this.state.endDate;
    let portfolioweights = this.state.portfolioweights;
    let slxxweight = portfolioweights.SLXXweight;
    let isfweight = portfolioweights.ISFweight;
    let screenWidth = this.state.screenWidth;
    let precision = isNaN(notional) ? 5 : notional.toString().length - 1;
    let portfolioName = this.state.portfolioName;
    let alldata = this.props.alloverviewdata;
    let data = {};
    let ISFreturndata = [];
    let searchval = this.state.searchval;

    let globalloading = this.props.globalloading;

    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description;
    })

    let names = this.props.portfolioredux.filter(function(){

    })


    let temp_data_return = [];
    let dates = [];
    let datestemp = [];

    let dataanalysis = this.props.portfolioredux.map(function(value){

          let temp_data = value.data;

          let div_data = value.divs;

          // console.log(div_data);
          if(!(div_data instanceof Error)){
            temp_data.forEach(function(returndata) {
              var result = div_data.filter(function(divdata) {
                return divdata['ExDate'] === returndata['Date'];});
              returndata.dist_amount = (result[0] !== undefined) ? result[0].dist_amount : 0;
              });
            // console.log('joint ',temp_data);
          }

          let querystartDate = new Date(startDate.getTime() - 86400000);

          temp_data = temp_data.filter(function(obj) {
            return stringToDateMapper(obj['Date'],"dd/mmm/yyyy","/") > querystartDate;
          });

          temp_data = temp_data.filter(function(obj) {
            return stringToDateMapper(obj['Date'],"dd/mmm/yyyy","/") < endDate;
          });

          datestemp = temp_data.map(function(value){
            return value['Date']
          })

          temp_data_return = getReturn(temp_data,value.weight,notional);
          // console.log('temp data: ', temp_data_return);


          let dailyreturn_nodivs = temp_data_return.map(function(value){
            return value.dailyreturn_nodivs;
          })

          let dailyreturn_withdivs = temp_data_return.map(function(value){
            return value.dailyreturn_withdivs;
          })

          let cumulativereturn_withdivs = temp_data_return.map(function(value){
            return value.cumulativereturn_withdivs;
          })

          let cumulativereturn_nodivs = temp_data_return.map(function(value){
            return value.cumulativereturn_nodivs;
          })

          let weighteddailyreturn_nodivs = temp_data_return.map(function(value){
            return value.weighteddailyreturn_nodivs;
          })

          let weightedcumulativereturn_nodivs = temp_data_return.map(function(value){
            return value.weightedcumulativereturn_nodivs;
          })

          let cumulativecashreturn_withdivs = temp_data_return.map(function(value){
            return value.cumulativecashreturn_withdivs;
          })
          
          let totalweighteddailycashwithdivs = temp_data_return.map(function(value){
            return value.totalweighteddailycashwithdivs;
          })
          
          let weighteddailycashwithdivs = temp_data_return.map(function(value){
            return value.weighteddailycashwithdivs;
          })

          let cumulativeweightedreturn_withdivs = temp_data_return.map(function(value){
            return value.cumulativeweightedreturn_withdivs;
          })

          let weighteddailyreturn_withdivs = temp_data_return.map(function(value){
            return value.weighteddailyreturn_withdivs;
          })

          if(datestemp.length>dates.length){
            dates = datestemp;
          }



          return {
            "name":value.description["Bloomberg Ticker"], 
            "dailyreturn_nodivs":dailyreturn_nodivs, 
            "dailyreturn_withdivs":dailyreturn_withdivs,
            "cumulativereturn_withdivs":cumulativereturn_withdivs,
            "cumulativereturn_nodivs":cumulativereturn_nodivs,
            "cumulativecashreturn_withdivs":cumulativecashreturn_withdivs,
            "weighteddailyreturn_nodivs":weighteddailyreturn_nodivs,
            "weightedcumulativereturn_nodivs":weightedcumulativereturn_nodivs,
            "totalweighteddailycashwithdivs":totalweighteddailycashwithdivs,
            "weighteddailycashwithdivs":weighteddailycashwithdivs,
            "cumulativeweightedreturn_withdivs":cumulativeweightedreturn_withdivs,
            "weighteddailyreturn_withdivs":weighteddailyreturn_withdivs,
            "weight":value.weight
          }

    })

    // console.log('dataanalysis :',dataanalysis)

    let graphdataarray = dataanalysis.map(function(value){
      
          let data = {
            label: value.name,
            //backgroundColor: 'rgb(255, 99, 132)',
            backgroundColor: "transparent",
            borderColor: getRandomColor(),
            borderWidth: 1,
            pointRadius:0,
            data: value.cumulativereturn_withdivs,
          }
          return data
       
    })

    let portfolioreturn = []

    if(dataanalysis.length >0){

      for (var i = 0; i < dataanalysis[0].weightedcumulativereturn_nodivs.length; i++){
        let dailyportfolio = 0;
        for (var k = 0; k < dataanalysis.length; k++){
          if(!dataanalysis[k].weightedcumulativereturn_nodivs[i]){
            dailyportfolio = dailyportfolio;
          }
          else{
            dailyportfolio = dailyportfolio + dataanalysis[k].weightedcumulativereturn_nodivs[i];
          }
        }
        portfolioreturn.push(dailyportfolio);
      }

      let portfoliodata = {
              label: 'Portfolio',
              //backgroundColor: 'rgb(255, 99, 132)',
              backgroundColor: "transparent",
              borderColor: 'black',
              borderWidth: 2,
              pointRadius:0,
              data: portfolioreturn,
            }


      graphdataarray.push(portfoliodata);
    }

    const graphalldata ={
      labels:dates,
      datasets:graphdataarray,
    }




    // let platformfees=[{
    //     id:1,
    //     name:'H&L',
    //     transaction:7,
    //     ongoing:0.004
    //     },{
    //     id:2,
    //     name:'Fidelity',
    //     transaction:10,
    //     ongoing:0.002
    //     },{
    //     id:3,
    //     name:'Cofunds',
    //     transaction:0,
    //     ongoing:0.004
    //     },{
    //     id:4,
    //     name:'AJ Bell',
    //     transaction:2,
    //     ongoing:0.003
    //     },{
    //     id:5,
    //     name:'Transact',
    //     transaction:11,
    //     ongoing:0.008
    //     }]

    // let platform = this.state.platform;
    // console.log(DataSet)



    // let dates =  DataSet.map(function(obj) {
    //   return obj['Date'];
    // });



    // let res = portfoliodata

    // for(var i =1; i < portfoliodata.length;i++){
    //     let json1 = getTotalReturn(portfoliodata[i])
    //     let json2 = getTotalReturn(portfoliodata[i-1])
    //     res = _(json1).concat(json2).groupBy('Date').map(_.spread(_.assign)).value();
       
    // }
    // console.log('concatanated portfoliodata :',res)



    // let tabledata=[]

    // let isfcum = 0;
    // let isfcumwithfee = notional*isfweight;
    // let isfcumnotional = notional*isfweight;
    // let slxxcumwithfee = notional*slxxweight;
    // let slxxcumnotional = notional*slxxweight;
    // let ernscumwithfee = notional*(1-slxxweight - isfweight);
    // let ernscumnotional = notional*(1-slxxweight - isfweight);
    // let slxxcum = 0;
    // let ernscum = 0;
    // let weightedreturn = 0;
    // let weightedreturncum = 0;

    // let weightedcumnotional = notional;
    // let weightedcumwithfee = notional;

    // let transactionfee = platformfees[platform-1].transaction;
    // let ongoingfee = platformfees[platform-1].ongoing;

    // for(var i = 0; i < DataSet.length; i++) {

    //   isfcum = isfcum + parseFloat(DataSet[i].ISFDailyReturn);

    //   isfcumnotional = isfcumnotional*(1+parseFloat(DataSet[i].ISFDailyReturn)/100);
    //   isfcumwithfee = isfcumwithfee*(1+parseFloat(DataSet[i].ISFDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

    //   slxxcumnotional = slxxcumnotional*(1+parseFloat(DataSet[i].SLXXDailyReturn)/100);
    //   slxxcumwithfee = slxxcumwithfee*(1+parseFloat(DataSet[i].SLXXDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

    //   ernscumnotional = ernscumnotional*(1+parseFloat(DataSet[i].ERNSDailyReturn)/100);
    //   ernscumwithfee = ernscumwithfee*(1+parseFloat(DataSet[i].ERNSDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

    //   weightedcumnotional = isfcumnotional+slxxcumnotional+ernscumnotional;
    //   weightedcumwithfee = isfcumwithfee+slxxcumwithfee+ernscumwithfee;//0.4% daily fee
    //   //console.log(weightedcumwithfee)
    //   slxxcum = slxxcum + parseFloat(DataSet[i].SLXXDailyReturn);
    //   ernscum = ernscum + parseFloat(DataSet[i].ERNSDailyReturn);

    //   weightedreturn = parseFloat(DataSet[i].ISFDailyReturn)*isfweight + parseFloat(DataSet[i].SLXXDailyReturn)*slxxweight + parseFloat(DataSet[i].ERNSDailyReturn)*(1-slxxweight-isfweight);

    //   weightedreturncum  = weightedreturncum + weightedreturn;

    //   var obj = {
    //     'Date':DataSet[i]['Date'],
    //     'ISFReturn':parseFloat(DataSet[i].ISFDailyReturn),
    //     'ISFcum':isfcum.toString().substring(0,precision),
    //     'ISFnotional':isfcumnotional.toString().substring(0,precision),
    //     'ISFcumwithfee':isfcumwithfee.toString().substring(0,precision),
    //     'slxxcumwithfee':slxxcumwithfee.toString().substring(0,precision),
    //     'ernscumwithfee':ernscumwithfee.toString().substring(0,precision),
    //     'weightedcumwithfee':weightedcumwithfee.toString().substring(0,precision+1),
    //     'SLXXReturn':parseFloat(DataSet[i].SLXXDailyReturn),
    //     'SLXXcum':slxxcum.toString().substring(0,precision),
    //     'ERNSReturn':parseFloat(DataSet[i].ERNSDailyReturn),
    //     'ernscum':ernscum.toString().substring(0,precision),
    //     'weightedreturn': weightedreturn,
    //     'weightedreturncum': weightedreturncum,
    //   }  

    //   tabledata.push(obj);
    // }

    // let ISFTR = tabledata.map(function(obj) {return parseFloat(obj.ISFcum);});
    // let ISFTRfee = tabledata.map(function(obj) {return parseFloat(obj.ISFcumwithfee);});
    // let ISFdaily = tabledata.map(function(obj) {return parseFloat(obj.ISFReturn);});

    // let SLXXTR = tabledata.map(function(obj) {return parseFloat(obj.SLXXcum);});
    // let SLXXdaily = tabledata.map(function(obj) {return parseFloat(obj.SLXXReturn);});
    // let SLXXTRfee = tabledata.map(function(obj) {return parseFloat(obj.slxxcumwithfee);});

    // let ERNSTR = tabledata.map(function(obj) {return parseFloat(obj.ernscum);});
    // let ERNSdaily = tabledata.map(function(obj) {return parseFloat(obj.ERNSReturn);});
    // let ERNSTRfee = tabledata.map(function(obj) {return parseFloat(obj.ernscumwithfee);});

    // let WeightedCum = tabledata.map(function(obj) {return parseFloat(obj.weightedreturncum);});
    // let dailyweighted = tabledata.map(function(obj) {return parseFloat(obj.weightedreturn);});
    // let WeightedTRfee = tabledata.map(function(obj) {return parseFloat(obj.weightedcumwithfee);});

    // let minISF = Math.min(...ISFTR);
    // let minSLXX = Math.min(...SLXXTR);
    // let minERNS = Math.min(...ERNSTR);
    // let minWeighted = Math.min(...WeightedCum);

    // let portfolioSD = standardDeviation(dailyweighted);
    // let ISFSD = standardDeviation(ISFdaily);
    // let SLXXSD = standardDeviation(SLXXdaily);
    // let ERNSSD = standardDeviation(ERNSdaily);

    // let portfolioTR = {
    //   'ISFTR':ISFTR,
    //   'SLXXTR':SLXXTR,
    //   'ERNSTR':ERNSTR,
    //   'WeightedCum':WeightedCum
    // }

    // let portfolioDR = {
    //   'ISFdaily':ISFdaily,
    //   'SLXXdaily':SLXXdaily,
    //   'ERNSdaily':ERNSdaily,
    //   'dailyweighted':dailyweighted
    // }

    //console.log(portfolioTR)



    let options = screenWidth < 500 ? {
      responsive:true,
      maintainAspectRatio: true,
      legend:{
        display: true,
        labels:{
          fontSize:10,
          padding:4,
          boxWidth: 10,
        }
      },
      scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + '%';
                    },
                    fontSize:10,
                }
            }],
            xAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    fontSize:10,
                    maxTicksLimit:8

                    // callback: function(value, index, values) {
                    //     return value.substring(3,5) + '-' + value.substring(6,10);
                    // }
                },
                type: "time",
                time: {
                displayFormats: {
                    quarter: 'MMM yyyy'
                  },
                }
            }]
        }
    } : {
      responsive:true,
      maintainAspectRatio: true,
      legend:{
        display: true,
        labels:{
          fontSize:10,
          padding:4,
          boxWidth: 20,
        }
      },
      scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + '%';
                    }
                   
                }
            }],
            xAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    fontSize:12,
                    maxTicksLimit:24,

                    // callback: function(value, index, values) {
                    //     return value.substring(3,5) + '-' + value.substring(6,10);
                    // }
                },
                type: "time",
                time: {
                displayFormats: {
                    quarter: 'MMM yyyy'
                  },
                }
            }]
        }
    };

    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 20,
      marginBottom: 20,
      border: 0,
      overflow: 'hidden',
      border:'2px solid #EFF2F7'
    };

    const customPanelStyle2 = {
      background: '#f7f7f7',
      borderRadius: 20,
      marginBottom: 0,
      border: 0,
      overflow: 'hidden',
      border:'2px solid #EFF2F7'
    };


    // let ShowStats = '';
    let ShowCarousel = <p>Add some ETFs above to see the stats</p>;

    if (portfolio.length>0){
       
       ShowCarousel = <CustomCarousel graphalldata={graphalldata} options={options} dataanalysis={dataanalysis}/>
       // ShowStats = <PortfolioStateComponent data = {dataanalysis} /> 
    }

    const { run, steps } = this.state;

    // tabledata = tabledata.reverse();

    return (
      
      
      <div >

        <Nav {...this.props}/>

            

              <Modal
                title={"Portfolio Construction"}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button style={{width:"20%"}} key="back" type="primary"onClick={this.handleCancel}>Close</Button>,
                  <Button style={{width:"36%", marginRight:"2%"}} key="back" type="primary"onClick={this.handleCancel}>Add to Portfolio?</Button>,
                ]}

              >
              {/*
                Search for an ETF:
                  <Select
                    showSearch
                    style={{ width: 200, paddingBottom:"2%", paddingLeft:"2%"}}
                    placeholder="Select an ETF"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    value={this.state.searchval}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >


                  {names.map(function(name, index){
                      return <Option value={ name }>{name}</Option>;
                    })}


                  </Select>
            */}

                <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                   <h5>Portfolio</h5>

                          <Card style={{padding:"1%", marginTop:"2%", marginBottom:"2%"}}>

                           <h5 style={{ marginBottom: 8 }}>ETFs:</h5>

                             <Row style={{align:'middle'}}>
                               
                                 <div style={{ marginTop: 8 }}>
                                   {portfolio.map(function(value, index){
                                     return <SpecialTag etf={value} />
                                  })}

                                 </div>
                               
                            </Row>

                           </Card>

                     Tap an ETF to find out more:
                     
                          <Card style={{padding:"1%", marginTop:"2%", marginBottom:"2%"}}>

                           <h5 style={{ marginBottom: 8 }}>ETFs:</h5>

                             <Row style={{align:'middle'}}>
                             
                                 <div style={{ marginTop: 8 }}>
                                   {alldata.map(function(value, index){
                                     return <SpecialTag etf={value} />
                                  })}

                                 </div>
                            </Row>

                           </Card>
                       </Spin>
              </Modal>

        <div className="topdetail" style={{padding:"5%", paddingTop:"2%", paddingBottom:"2%"}}>
        <div>
          <Row>

             <Glossary />
             <Button  type="primary" onClick={this.addETF}> + ETF </Button>
             <Button  type="primary" onClick={this.newPortfolio}> Generate Initial Portfolio </Button>
          </Row>
          </div>

        </div>
        
        <section id="Standard" style={{paddingTop:'0'}}>
            
        
          <Container >
             

          <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>

          <Card style={{margin:"1%"}}>
             <Col>
              <Row style={{paddingBottom:'10px'}}>
               
                <label style={{paddingRight:'10px'}}>
                  Investment:
                  <input className="notionaltyper" type="number" name="name" value={notional} onChange={this.handleChange} style={{marginLeft:'20px'}}/>
                </label>
               </Row>
             </Col>

                <Row className='datetutorial'>
                  <label onClick={e => e.preventDefault()} style={{ paddingRight:'5%', width:"40%", fontSize:'15px', display: 'inline-block'}}>
                    Start Date:
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        style={{paddingLeft:'2% !important', display: 'inline-block', width:"20%", "z-index":"1000"}}
                        withPortal
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"

                    />
                  </label>

                  <label onClick={e => e.preventDefault()} style={{paddingLeft:'10%', fontSize:'15px', width:"40%", display: 'inline-block'}}>
                    End Date:
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        dateFormat="dd/MM/yyyy"
                        withPortal
                        popperPlacement='top-end'
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                  </label>
                </Row>

                <p> Time Period </p>

                  <RadioGroup onChange={this.onTimePeriodChange} style={{paddingBottom:"2%"}}>
                    <Radio value={1}>1 Month</Radio>
                    <Radio value={3}>3 Months</Radio>
                    <Radio value={12}>1 Year</Radio>
                    <Radio value={36}>3 Years</Radio>
                    <Radio value={60}>5 Years</Radio>
                  </RadioGroup>
                  {/*}
                <p> Risk Profile </p>

                <RadioGroup onChange={this.onRPChange}>
                  <Radio value={1}>Low</Radio>
                  <Radio value={2}>Medium</Radio>
                  <Radio value={3}>High</Radio>
                  <Radio value={4}>Adventurous</Radio>
                </RadioGroup>
                  */}
                </Card>

                 <Card style={{margin:"1%", textAlign:"center"}}>
                   <p> Portfolio Selected </p>

                   {this.props.portfolioredux.map(function(value, index){
                             return <PortfolioSlider etf={value} />
                                })}
                 </Card>
             {/*}

             <Collapse
              className="mainPanel"
              bordered={false}
              defaultActiveKey={['1','2','3','4','5','6']}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
             
            
              <Panel className="quickchanges" header="Quick Inputs" key="2" style={customPanelStyle}>


              </Panel>

              
              <Panel className="statspanel" header="Stats" key="3" style={customPanelStyle}>
                
              </Panel>
               
              <Panel className="statspanel" header="Stats" key="3" style={customPanelStyle}>

              <StatsComponent 
                weights={portfolioweights}
                notional={notional}
                portfolioTR={portfolioTR}
                portfolioDR={portfolioDR}
                />

              </Panel>
           <Panel className="tutorialplatforms" header="Platform Fees" key="4" style={customPanelStyle}>

            <Col style={{'vertical-align':'top', paddingBottom:'0px'}}>
            <div>
                <h4 style={{'vertical-align':'middle'}}> Platform <Icon className="platformfeedetail" type="info-circle" style={{color:'blue', alignItem:'right'}} />
                </h4>

                <RadioGroup className="platformchoice" onChange={this.onPlatformChange} style={{paddingBottom:"2%"}} value={this.state.platform}>
                  <Radio value={1}>H&L</Radio>
                  <Radio value={2}>Fidelity</Radio>
                  <Radio value={3}>Cofunds</Radio>
                  <Radio value={4}>AJ Bell</Radio>
                  <Radio value={5}>Transact</Radio>
                </RadioGroup>

            </div>

                <table  class="table table-fixed" className="statstable" style={{width:'100%'}} >
                  <thead>
                    <tr>
                      <th class="col-xs-2">Product</th>
                      <th class="col-xs-2">ISF</th>
                      <th class="col-xs-2">SLXX</th>
                      <th class="col-xs-2">ERNS</th>
                      <th class="col-xs-2">Portfolio</th>

                    </tr>
                  </thead>
                  <tbody>

                     <tr className="tutorialcash">
                      <th class="col-xs-2">Investment</th>
                      <th class="col-xs-2">{(isfweight*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2">{(slxxweight*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2">{((1-isfweight-slxxweight)*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2">{notional.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                    </tr>

                    <tr className="tutorialreturn">
                      <th class="col-xs-2">Return</th>
                      <th class="col-xs-2" style={{color: ISFTR[ISFTR.length-1] < 0 ? "red" : ""}}>{String(ISFTR[ISFTR.length-1]).substring(0,5)+"%"}</th>
                      <th class="col-xs-2" style={{color: SLXXTR[SLXXTR.length-1] < 0 ? "red" : ""}}>{String(SLXXTR[SLXXTR.length-1]).substring(0,5)+"%"}</th>
                      <th class="col-xs-2" style={{color: ERNSTR[ERNSTR.length-1] < 0 ? "red" : ""}}>{String(ERNSTR[ERNSTR.length-1]).substring(0,5)+"%"}</th>
                      <th class="col-xs-2" style={{color: WeightedCum[WeightedCum.length-1] < 0 ? "red" : ""}}>{String(WeightedCum[WeightedCum.length-1]).substring(0,5)+"%"}</th>

                    </tr>

                    <tr className="tutorialreturncash">
                      <th class="col-xs-2">Cash Return</th>
                      <th class="col-xs-2" style={{color: ISFTR[ISFTR.length-1] < 0 ? "red" : ""}} >{String((ISFTR[ISFTR.length-1]/100+1)*notional*isfweight).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: SLXXTR[SLXXTR.length-1] < 0 ? "red" : ""}} >{String((SLXXTR[SLXXTR.length-1]/100+1)*notional*slxxweight).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: ERNSTR[ERNSTR.length-1] < 0 ? "red" : ""}} >{String((ERNSTR[ERNSTR.length-1]/100+1)*notional*(1-isfweight-slxxweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: WeightedCum[WeightedCum.length-1] < 0 ? "red" : ""}} >{String((WeightedCum[WeightedCum.length-1]/100+1)*notional).substring(0,precision+1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                    </tr>

                    <Tooltip title="A higher standard deviation means historically that asset goes up or down a lot in value in a short period of time relative to other things">
                    <tr className="tutorialSD">
                      <th class="col-xs-2">With Platform Fees</th>
                       
                      <th class="col-xs-2" style={{color: ISFTRfee[ISFTRfee.length-1] < 0 ? "red" : ""}} >{String(ISFTRfee[ISFTRfee.length-1]).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: SLXXTRfee[SLXXTRfee.length-1] < 0 ? "red" : ""}} >{String((SLXXTRfee[SLXXTRfee.length-1])).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: ERNSTRfee[ERNSTRfee.length-1] < 0 ? "red" : ""}} >{String((ERNSTRfee[ERNSTRfee.length-1])).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: WeightedTRfee[WeightedTRfee.length-1] < 0 ? "red" : ""}} >{String((WeightedTRfee[WeightedTRfee.length-1])).substring(0,precision+2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                    </tr>
                    </Tooltip>
                    <tr>
                      <th class="col-xs-2">Transaction Fees</th>
                      <th class="col-xs-2" style={{color: minISF < 0 ? "red" : ""}}>{0}</th>
                      <th class="col-xs-2" style={{color: minSLXX < 0 ? "red" : ""}}>{0}</th>
                      <th class="col-xs-2" style={{color: minERNS < 0 ? "red" : ""}}>{0}</th>
                      <th class="col-xs-2" style={{color: minWeighted < 0 ? "red" : ""}}>{0}</th>

                    </tr>
                    <tr>
                      <th class="col-xs-2">Holding Fees</th>
                      <th class="col-xs-2" style={{color: minISF < 0 ? "red" : ""}}>{String(ISFTRfee[ISFTRfee.length-1]-((ISFTR[ISFTR.length-1]/100+1)*notional*isfweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minSLXX < 0 ? "red" : ""}}>{String(SLXXTRfee[SLXXTRfee.length-1]-((SLXXTR[SLXXTR.length-1]/100+1)*notional*slxxweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minERNS < 0 ? "red" : ""}}>{String(ERNSTRfee[ERNSTRfee.length-1]-((ERNSTR[ERNSTR.length-1]/100+1)*notional*(1-isfweight-slxxweight))).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minWeighted < 0 ? "red" : ""}}>{String(WeightedTRfee[WeightedTRfee.length-1]-((WeightedCum[WeightedCum.length-1]/100+1)*notional)).substring(0,precision+2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                    </tr>
                    <tr>
                      <th class="col-xs-2">Total Fees</th>
                      <th class="col-xs-2" style={{color: minISF < 0 ? "red" : ""}}>{String(ISFTRfee[ISFTRfee.length-1]-((ISFTR[ISFTR.length-1]/100+1)*notional*isfweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minSLXX < 0 ? "red" : ""}}>{String(SLXXTRfee[SLXXTRfee.length-1]-((SLXXTR[SLXXTR.length-1]/100+1)*notional*slxxweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minERNS < 0 ? "red" : ""}}>{String(ERNSTRfee[ERNSTRfee.length-1]-((ERNSTR[ERNSTR.length-1]/100+1)*notional*(1-isfweight-slxxweight))).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                      <th class="col-xs-2" style={{color: minWeighted < 0 ? "red" : ""}}>{String(WeightedTRfee[WeightedTRfee.length-1]-((WeightedCum[WeightedCum.length-1]/100+1)*notional)).substring(0,precision+2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                    </tr>
                   </tbody>
                  </table>

             </Col>

              </Panel>

            
              <Panel header="Graphs" key="5" style={customPanelStyle}>

                
   
                  <Line data={graphalldata} options={options} />
                

              </Panel>
              
              <Panel header="Data Points" key="6" style={customPanelStyle}>
                <div style={{padding:'10px'}}>
                <BootstrapTable data={tabledata} striped pagination exportCSV>
                    <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='ISFReturn'>ISF</TableHeaderColumn>
                    <TableHeaderColumn dataField='ISFcumwithfee'>ISF TR Fee</TableHeaderColumn>
                    <TableHeaderColumn dataField='SLXXReturn'>SLXX</TableHeaderColumn>
                    <TableHeaderColumn dataField='SLXXcum'>SLXX TR</TableHeaderColumn>
                    <TableHeaderColumn dataField='ERNSReturn'>ERNS</TableHeaderColumn>
                    <TableHeaderColumn dataField='ernscum'>ERNS TR</TableHeaderColumn>
                    <TableHeaderColumn dataField='weightedreturn' dataSort>Weighted Return</TableHeaderColumn>
                    <TableHeaderColumn dataField='weightedreturncum'>Cumulative Weighted Return </TableHeaderColumn>
                </BootstrapTable>
                </div>
              </Panel>
            </Collapse>
              */}
                  <Card style={{margin:"1%", textAlign:"center"}}>
                  {ShowCarousel}
                  </Card>
                    
                  
                  
            


            </Spin>
          </Container>

        </section>

        <Footer/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio,
    globalloading:state.portfolioReducer.loading,
    alloverviewdata:state.portfolioReducer.alldata
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  globalLoading: loading => dispatch(portfolioActions.globalLoading(loading)),
  loadalloverview: data => dispatch(portfolioActions.loadalloverview(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioTool);

