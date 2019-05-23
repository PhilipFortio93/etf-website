import React from 'react';
import Nav from './components/Nav';  
import Footer from './components/Footer'
import StatsComponent from './components/statscomponent'
import TutorialModal from './components/TutorialModal'
import Glossary from './components/Glossary'
import PlatformFees from './components/PlatformFees'
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
  Slider, InputNumber, Row, Col, Tooltip, Modal, Button, Collapse, Icon, Popover,Radio, Card, Steps, Drawer, Input, Form
} from 'antd';
import "antd/dist/antd.css";
import "./toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';
import {standardDeviation,average,getReturn} from './components/mathsfunctions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';

var MediaQuery = require('react-responsive');

const Step = Steps.Step;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const text ='hello';

function stringToDate(_date,_format,_delimiter)
  {
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
  }


class PortfolioTool extends React.Component {



  constructor() {
    super();

    this.state = {
      notional:10000,
      alldata:[],
      ISFdata:[],
      startDate:new Date(2015,0,1),
      endDate:new Date(2018,11,30),
      portfolioweights:{
        ISFweight: 0.25,
        SLXXweight: 0.25,
      },
      portfoliotwo:[],
      portfolio:"ISF",
      screenWidth: null,
      visibledrawer: false,
      platform: 1,
      overviewall:[],
      visible:false,
      portfolioName:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeISF = this.handleChangeISF.bind(this);
    this.handleChangeSLXX = this.handleChangeSLXX.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onTimePeriodChange = this.onTimePeriodChange.bind(this);
    this.onRPChange = this.onRPChange.bind(this);
    this.infoclick = this.infoclick.bind(this);
    this.onPlatformChange = this.onPlatformChange.bind(this);
    this.addETF = this.addETF.bind(this);
    this.updatePortfolioName = this.updatePortfolioName.bind(this);
  }
  
  componentDidMount(){
    
    this.setState({alldata:DailyReturns})
    window.addEventListener("resize", this.updateWindowDimensions());

    let portfoliotwo = [];
    if(localStorage.getItem('portfoliotwo')){
       portfoliotwo = localStorage.getItem('portfoliotwo');
       console.log(typeof portfoliotwo)
    }
    
    this.setState({portfoliotwo:portfoliotwo})
    let selected = this.state.portfolio;

    fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/historical?etf-id='+selected, {
          method: 'GET', // or 'PUT'
          // body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*'
          }
     }).then(res => res.json())
      .then(res => this.setState({ISFdata:res}))
      .catch(error => console.error('Error:', error));

    fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/alloverview', {
      method: 'GET', // or 'PUT'
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':'*'
      }
    }).then(res => res.json())
    .then(res => this.setState({overviewall:res,loading:false}))
    .catch(error => console.error('Error:', error));
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
     if (e.target.value == '1'){
       this.setState({
         portfolioweights:{ISFweight:0,SLXXweight: 0.15}
       })
     }
     else if (e.target.value == '2'){
       this.setState({
         portfolioweights:{ISFweight:0,SLXXweight: 0.3}
       })
     }
     else if (e.target.value == '3'){
       this.setState({
         portfolioweights:{ISFweight:0.2,SLXXweight: 0.3}
       })
     }
     else{
       this.setState({
         portfolioweights:{ISFweight:0.4,SLXXweight: 0.5}
       })
     }
  }

  handleOk = (e) => {

    this.setState({
      visible: false
    });
    this.props.createItem("BAM");

    
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
     let today = new Date(2019,0,1);
    
     if (e.target.value == '1'){
       
       let year = today.getFullYear();
       let month = today.getMonth()-1;
       let day = today.getDay();

       console.log(day);
       this.setState({
         startDate:new Date(year,month,day),
         endDate: today,
       })
     }
     else if (e.target.value == '2'){
       this.setState({
         startDate:new Date(2018,8,1),
         endDate: today
       })
     }
     else if (e.target.value == '3'){
        this.setState({
         startDate:new Date(2018,0,1),
         endDate: today
       })      
     }
     else if (e.target.value == '4'){
        this.setState({
         startDate:new Date(2016,0,1),
         endDate: today
       })      
     }
     else{
       this.setState({
         startDate:new Date(2014,0,1),
         endDate: today
       })
     }
  }

  handleDateChange(event){
     this.setState({startDate: event});
  }

  handleEndDateChange(event){
    this.setState({endDate: event});
  }


  handleChangeSLXX(event){
    this.setState({SLXXweight:event.target.value});
    console.log("setting SLXX weight to "+this.state.SLXXweight.toString())
  }

  addETF(){
    console.log("adding an ETF");
    this.setState({
      visible: true,
    });
  }



  handleChangeISF = (value) => {
      
      if (Number.isNaN(value)) {
        return;
      }
      this.setState({
        portfolioweights:{ISFweight:value, SLXXweight:this.state.portfolioweights.SLXXweight}
      });
    }

  handleChangeSLXX = (value) => {
      if (Number.isNaN(value)) {
        return;
      }
      this.setState({
        portfolioweights:{ISFweight:this.state.portfolioweights.ISFweight,SLXXweight: value}
      });
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
    let overviewall = this.state.overviewall;
    let portfolioName = this.state.portfolioName;
    let alldata = this.state.overviewall;
    let ISFdata = this.state.ISFdata;
    let data = {}
    let ISFreturndata = []
    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description;
    })
    let weights = this.props.portfolioredux.map(function(value){
      return value.weight;
    })

    // data.map(function(item) {
    //   return { letter: item.src };
    // })
    ISFdata = ISFdata.reverse();
    ISFreturndata = getReturn(ISFdata);

    // console.log(ISFreturndata);
    // console.log(alldata);
    //DataSet = DataSet.slice(0,300);

    let platformfees=[{
        id:1,
        name:'H&L',
        transaction:7,
        ongoing:0.004
        },{
        id:2,
        name:'Fidelity',
        transaction:10,
        ongoing:0.002
        },{
        id:3,
        name:'Cofunds',
        transaction:0,
        ongoing:0.004
        },{
        id:4,
        name:'AJ Bell',
        transaction:2,
        ongoing:0.003
        },{
        id:5,
        name:'Transact',
        transaction:11,
        ongoing:0.008
        }]

    let platform = this.state.platform;
    // console.log(DataSet)

    DataSet =  DataSet.filter(function(obj) {
      return stringToDate(obj['Date'],"dd/MM/yyyy","/") > startDate;
    });

    // DataSet =  DataSet.filter(function(obj) {
    //   return parseFloat(obj.ISFDailyReturn) != 0;
    // });

    DataSet =  DataSet.filter(function(obj) {
      return stringToDate(obj['Date'],"dd/MM/yyyy","/") < endDate;
    });

    let dates =  DataSet.map(function(obj) {
      return obj['Date'];
    });

    //DataSet = DataSet.reverse();
    let tabledata=[]

    let isfcum = 0;
    let isfcumwithfee = notional*isfweight;
    let isfcumnotional = notional*isfweight;
    let slxxcumwithfee = notional*slxxweight;
    let slxxcumnotional = notional*slxxweight;
    let ernscumwithfee = notional*(1-slxxweight - isfweight);
    let ernscumnotional = notional*(1-slxxweight - isfweight);
    let slxxcum = 0;
    let ernscum = 0;
    let weightedreturn = 0;
    let weightedreturncum = 0;

    let weightedcumnotional = notional;
    let weightedcumwithfee = notional;

    let transactionfee = platformfees[platform-1].transaction;
    let ongoingfee = platformfees[platform-1].ongoing;

    for(var i = 0; i < DataSet.length; i++) {

      isfcum = isfcum + parseFloat(DataSet[i].ISFDailyReturn);

      isfcumnotional = isfcumnotional*(1+parseFloat(DataSet[i].ISFDailyReturn)/100);
      isfcumwithfee = isfcumwithfee*(1+parseFloat(DataSet[i].ISFDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

      slxxcumnotional = slxxcumnotional*(1+parseFloat(DataSet[i].SLXXDailyReturn)/100);
      slxxcumwithfee = slxxcumwithfee*(1+parseFloat(DataSet[i].SLXXDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

      ernscumnotional = ernscumnotional*(1+parseFloat(DataSet[i].ERNSDailyReturn)/100);
      ernscumwithfee = ernscumwithfee*(1+parseFloat(DataSet[i].ERNSDailyReturn)/100-ongoingfee/360);; //0.4% daily fee

      weightedcumnotional = isfcumnotional+slxxcumnotional+ernscumnotional;
      weightedcumwithfee = isfcumwithfee+slxxcumwithfee+ernscumwithfee;//0.4% daily fee
      //console.log(weightedcumwithfee)
      slxxcum = slxxcum + parseFloat(DataSet[i].SLXXDailyReturn);
      ernscum = ernscum + parseFloat(DataSet[i].ERNSDailyReturn);

      weightedreturn = parseFloat(DataSet[i].ISFDailyReturn)*isfweight + parseFloat(DataSet[i].SLXXDailyReturn)*slxxweight + parseFloat(DataSet[i].ERNSDailyReturn)*(1-slxxweight-isfweight);

      weightedreturncum  = weightedreturncum + weightedreturn;

      var obj = {
        'Date':DataSet[i]['Date'],
        'ISFReturn':parseFloat(DataSet[i].ISFDailyReturn),
        'ISFcum':isfcum.toString().substring(0,precision),
        'ISFnotional':isfcumnotional.toString().substring(0,precision),
        'ISFcumwithfee':isfcumwithfee.toString().substring(0,precision),
        'slxxcumwithfee':slxxcumwithfee.toString().substring(0,precision),
        'ernscumwithfee':ernscumwithfee.toString().substring(0,precision),
        'weightedcumwithfee':weightedcumwithfee.toString().substring(0,precision+1),
        'SLXXReturn':parseFloat(DataSet[i].SLXXDailyReturn),
        'SLXXcum':slxxcum.toString().substring(0,precision),
        'ERNSReturn':parseFloat(DataSet[i].ERNSDailyReturn),
        'ernscum':ernscum.toString().substring(0,precision),
        'weightedreturn': weightedreturn,
        'weightedreturncum': weightedreturncum,
      }  

      tabledata.push(obj);
    }

    let ISFTR = tabledata.map(function(obj) {return parseFloat(obj.ISFcum);});
    let ISFTRfee = tabledata.map(function(obj) {return parseFloat(obj.ISFcumwithfee);});
    let ISFdaily = tabledata.map(function(obj) {return parseFloat(obj.ISFReturn);});

    let SLXXTR = tabledata.map(function(obj) {return parseFloat(obj.SLXXcum);});
    let SLXXdaily = tabledata.map(function(obj) {return parseFloat(obj.SLXXReturn);});
    let SLXXTRfee = tabledata.map(function(obj) {return parseFloat(obj.slxxcumwithfee);});

    let ERNSTR = tabledata.map(function(obj) {return parseFloat(obj.ernscum);});
    let ERNSdaily = tabledata.map(function(obj) {return parseFloat(obj.ERNSReturn);});
    let ERNSTRfee = tabledata.map(function(obj) {return parseFloat(obj.ernscumwithfee);});

    let WeightedCum = tabledata.map(function(obj) {return parseFloat(obj.weightedreturncum);});
    let dailyweighted = tabledata.map(function(obj) {return parseFloat(obj.weightedreturn);});
    let WeightedTRfee = tabledata.map(function(obj) {return parseFloat(obj.weightedcumwithfee);});

    let minISF = Math.min(...ISFTR);
    let minSLXX = Math.min(...SLXXTR);
    let minERNS = Math.min(...ERNSTR);
    let minWeighted = Math.min(...WeightedCum);

    let portfolioSD = standardDeviation(dailyweighted);
    let ISFSD = standardDeviation(ISFdaily);
    let SLXXSD = standardDeviation(SLXXdaily);
    let ERNSSD = standardDeviation(ERNSdaily);

    let portfolioTR = {
      'ISFTR':ISFTR,
      'SLXXTR':SLXXTR,
      'ERNSTR':ERNSTR,
      'WeightedCum':WeightedCum
    }

    let portfolioDR = {
      'ISFdaily':ISFdaily,
      'SLXXdaily':SLXXdaily,
      'ERNSdaily':ERNSdaily,
      'dailyweighted':dailyweighted
    }

    //console.log(portfolioTR)
    const slxxdatatwo= {
        
        labels: dates,
          datasets: [{
          label: "ISF TR",
          //backgroundColor: 'rgb(255, 99, 132)',
          backgroundColor: "transparent",
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          pointRadius:0,
          data: ISFTR,
        },
        {
          label: "SLXX TR",
          //backgroundColor: 'rgb(25, 99, 132)',
          backgroundColor: "transparent",
          borderColor: 'rgb(25, 99, 12)',
          borderWidth: 1,
          pointRadius:0,
          data: SLXXTR,
        }
        ,
        {
          label: "ERNS TR",
          //backgroundColor: 'rgb(25, 99, 132)',
          backgroundColor: "transparent",
          borderColor: 'rgb(25, 99, 132)',
          borderWidth: 1,
          pointRadius:0,
          data: ERNSTR,
        },
        {
          label: "Portfolio",
          //backgroundColor: 'rgb(25, 99, 132)',
          backgroundColor: "transparent",
          borderColor: 'rgb(25, 0, 132)',
          borderWidth: 2,
          pointRadius:0,
          data: WeightedCum,
        }
        ]
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
                    maxTicksLimit:8,
                    callback: function(value, index, values) {
                        return value.substring(3,5) + '-' + value.substring(6,10);
                    }
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
                    callback: function(value, index, values) {
                        return value.substring(3,5) + '-' + value.substring(6,10);
                    }
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

    const { run, steps } = this.state;

    tabledata = tabledata.reverse();

    return (
      
      
      <div >

        <Nav {...this.props}/>


              <Modal
                title={"Add an ETF"}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button style={{width:"20%"}} key="back" type="primary"onClick={this.handleCancel}>Close</Button>,
                  <Button style={{width:"36%", marginRight:"2%"}} key="back" type="primary"onClick={this.handleCancel}>Add to Portfolio?</Button>,
                ]}

              >
              <h5>Portfolio Name</h5>

              <Input
                    type="text"
                    onChange={this.updatePortfolioName}
                 />

               <h5>Selected Names</h5>

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


              </Modal>

        <div className="topdetail" style={{padding:"5%", paddingTop:"2%", paddingBottom:"2%"}}>
        <div>
          <Row>

             <Glossary />
          </Row>
          </div>

        </div>
        
        <section id="Standard" style={{paddingTop:'0'}}>
            
        
          <Container >
             

             <Collapse
              className="mainPanel"
              bordered={false}
              defaultActiveKey={['1','2','3','4','5','6']}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              <Panel header="Custom Inputs" key="1" style={customPanelStyle}>

              <Col>
              <Row style={{paddingBottom:'10px'}}>
               
                <label style={{paddingRight:'10px'}}>
                  Investment:
                  <input className="notionaltyper" type="number" name="name" value={notional} onChange={this.handleChange} style={{marginLeft:'20px'}}/>
                </label>
               </Row>
                <Row className='datetutorial'>
                <label onClick={e => e.preventDefault()} style={{ paddingRight:'5%', width:"40%", fontSize:'15px', display: 'inline-block'}}>
                  Start Date:
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                      dateFormat="dd/MM/YYYY"
                      style={{paddingLeft:'2% !important', display: 'inline-block', width:"20%"}}
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
                      dateFormat="dd/MM/YYYY"
                      withPortal
                      popperPlacement='top-end'
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                  />
                </label>
                </Row>
                <div className="fundslist">
                <Row style={{'verticalAlign': 'bottom'}}>
                
                   <Col span={4}>
               

                    <p style={{'verticalAlign': 'bottom'}} className='clickablelabel' onClick={this.infoclick}>
                      <Icon type="info-circle" style={{color:'blue'}}  /> 
                      ISF :
                    </p>
                
                   </Col>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={1-slxxweight}
                        onChange={this.handleChangeISF}
                        value={typeof isfweight === 'number' ? isfweight : 0}
                        step={0.01}
                      />
                    </Col>
                    <Col span={1}>
                      <InputNumber
                        min={0}
                        max={1-slxxweight}
                        step={0.01}
                        value={isfweight}
                        onChange={this.handleChangeISF}
                      />
                    </Col>
              </Row>
 
                <Row>
                
                   <Col span={4}>
                    <label>
                      SLXX :
                    </label>
                   </Col>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={1-isfweight}
                        onChange={this.handleChangeSLXX}
                        value={typeof slxxweight === 'number' ? slxxweight : 0}
                        step={0.01}

                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={0}
                        max={1-isfweight}
                        step={0.01}
                        value={slxxweight}
                        onChange={this.handleChangeSLXX}
                      />
                    </Col>
              </Row>


              <Row style={{paddingBottom:'10px'}}>
                
                   <Col span={4}>
                   <Popover placement="right" content={text} title="Title" trigger="click">
                    <label className='clickablelabel'>
                      ERNS :
                    </label>
                   </Popover>
                   </Col>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={1}
                        value={typeof (1-isfweight-slxxweight) === 'number' ? (1-isfweight-slxxweight) : 0}
                        step={0.01}
                        disabled={true}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        value={(1-isfweight-slxxweight).toString().substring(0,4)}
                        disabled={true}
                      />
                    </Col>
              </Row>
              </div>
             </Col>

             </Panel>
               
              <Panel className="quickchanges" header="Quick Inputs" key="2" style={customPanelStyle}>
                <h4> Time Period </h4>

                <RadioGroup onChange={this.onTimePeriodChange} style={{paddingBottom:"2%"}}>
                  <Radio value={1}>1 Month</Radio>
                  <Radio value={2}>3 Months</Radio>
                  <Radio value={3}>1 Year</Radio>
                  <Radio value={4}>3 Years</Radio>
                  <Radio value={5}>5 Years</Radio>
                </RadioGroup>

                <h4> Risk Profile </h4>

                <RadioGroup onChange={this.onRPChange}>
                  <Radio value={1}>Low</Radio>
                  <Radio value={2}>Medium</Radio>
                  <Radio value={3}>High</Radio>
                  <Radio value={4}>Adventurous</Radio>
                </RadioGroup>

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

                <div>
   
                  <Line data={slxxdatatwo} options={options} />
                </div>

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

          </Container>

        </section>
        <Footer/>
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
)(PortfolioTool);

