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
import SectorBreakdown from './components/SectorBreakdown';
import CountryBreakdown from './components/CountryBreakdown';

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

  // newPortfolio(){

  //      this.props.globalLoading(true);
  //      let selected = "ISF";
  //      Promise.all([
  //         fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/historical?etf-id='+selected, {
  //           method: 'GET', // or 'PUT'
  //           // body: JSON.stringify(data), // data can be `string` or {object}!
  //           headers:{
  //             'Content-Type': 'application/json',
  //             // 'Access-Control-Allow-Origin':'*'
  //           }
  //         }),
  //         fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/dividends?etf-id='+selected, {
  //             method: 'GET', // or 'PUT'
  //             // body: JSON.stringify(data), // data can be `string` or {object}!
  //             headers:{
  //               'Content-Type': 'application/json',
  //               // 'Access-Control-Allow-Origin':'*'
  //             }
  //           }),
  //         fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected, {
  //             method: 'GET', // or 'PUT'
  //             // body: JSON.stringify(data), // data can be `string` or {object}!
  //             headers:{
  //               'Content-Type': 'application/json',
  //               // 'Access-Control-Allow-Origin':'*'
  //             }
  //           })
  //       ])
  //       .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
  //       .then(([data1, data2, data3]) => {
  //           this.props.createItem({"description":data3,"data": data1,"divs":data2});
  //           this.props.globalLoading(false);
  //         }
  //       );
  // }

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
          console.log(temp_data)
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
            "weight":value.weight,
          }

    })


    let holdingsdata = [];
    let SectorComp = <p> Add to your portfolio to see the sector breakdown </p>;
    let CountryComp = <p> Add to your portfolio to see the sector breakdown </p>;
    let holdings = []
    if(this.props.portfolioredux.length > 0){

       holdings = this.props.portfolioredux.map(function(value){
       // console.log(value.holdings)
       return value.holdings
        })

      console.log("numer of etfs: ", this.props.portfolioredux.length);
      console.log("holdings data: ", holdings)

      for(k=0; k < this.props.portfolioredux.length; k++){
        holdingsdata = holdingsdata.concat(holdings[k])
      }
    
      console.log('holdingsdata :',holdingsdata);

    }

    if(holdingsdata.length >0){
      SectorComp = <SectorBreakdown holdings={holdingsdata} etfcount={this.props.portfolioredux.length}/>;
      CountryComp = <CountryBreakdown holdings={holdingsdata} etfcount={this.props.portfolioredux.length}/>;
    }


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


    // tabledata = tabledata.reverse();

    return (
      
      
      <div >

        <Nav {...this.props}/>

            

              <Modal
                title={"Portfolio Construction"}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[
                  <Button style={{width:"20%"}} key="back" type="primary"onClick={this.handleCancel}>Close</Button>,
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
             {/*<Button  type="primary" onClick={this.newPortfolio}> Generate Initial Portfolio </Button>*/}
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

              */}
                  <Card style={{padding:"2%",margin:"1%", textAlign:"center"}}>
                  
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

