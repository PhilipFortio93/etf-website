import React from 'react';
import Nav from './components/Nav';  
import Footer from './components/Footer';
import BasicOverview from './components/BasicOverview';
import SectorBreakdown from './components/SectorBreakdown';
import {Container} from 'reactstrap';
import DailyReturns from './tooldata/DailyReturns.json';
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Glossary from './components/Glossary';
import CanvasGraph from './CanvasChart';
import {
  Slider, InputNumber, Row, Col, Tooltip, Modal, Button, Select, Tabs, Spin, Tag, Card, Switch
} from 'antd';
import "antd/dist/antd.css";
import "./etfpage.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import _ from "lodash";
import {NAVComparison} from './components/mathsfunctions';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var moment = require('moment');

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const dateMap = {
  "Jan":0,
  "Feb":1,
  "Mar":2,
  "Apr":3,
  "May":4,
  "Jun":5,
  "Jul":6,
  "Aug":7,
  "Sep":8,
  "Oct":9,
  "Nov":10,
  "Dec":11
}
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

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  function callback(key) {
    console.log(key);
  }


const nonFailPromise = (promise) => {
  return new Promise((resolve) => {
    promise.then(resolve).catch(resolve);
  })
}

class ETFPage extends React.Component {



  constructor() {
    super();


    this.state = {
      visible:false,
      selected:'',
      overviewdata:{},
      holdingsdata: [],
      historicaldata: [],
      dividendsdata: [],
      pricedata: [],
      loading: false,
      alldata: [],
      showgraph:false,
      showPerf:false,
      screenWidth:null,
    };

    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.onPerfChange = this.onPerfChange.bind(this);
  }
  
  updateWindowDimensions() {
   this.setState({ screenWidth: window.innerWidth });
  }

  onChange(value) {
    this.setState({loading:true})
    let selected = value.substr(0,value.indexOf(' '));
    console.log(selected)
    let url='https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected;

    console.log(url);
    fetch(url, {
      method: 'GET', // or 'PUT'
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':'*'
      }
    }).then(res => res.json())
    .then(res => {
      this.setState({overviewdata:res,selected:selected,loading:false});
      // this.getData(selected)

      let id = selected;

      let route = {
        pathname:"/etfsearch/"+id,
        state:{
           etf:res
        }
      }
    this.props.history.push(route)

    })
    .catch(error => console.error('Error:', error));
    

  }

  onTableChange(value){
    console.log(value)
    this.setState({showgraph:value})
  }

  onPerfChange(value){
    console.log(value)
    this.setState({showPerf:value})
  }

  getData(value){
    let selected = this.props.match.params.id;
    if(value){
      selected = value;
    }
    console.log('getting data for:',selected)
    // const Http = new XMLHttpRequest();

    let today = moment().format("YYYY-MM-DD")

    this.props.globalLoading(true);

      Promise.all([
        nonFailPromise(fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/Historical.json', {
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
        })),
        nonFailPromise(fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/PriceHistory.json', {
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
        }))
      ])
      .then(([res2, res3, res4, res5]) => Promise.all([
        nonFailPromise(res2.json()), 
        nonFailPromise(res3.json()), 
        nonFailPromise(res4.json()), 
        nonFailPromise(res5.json()),
       ]))
      .then(([data2, data3, data4, data5]) => {
        // console.log('data5:',data5)
        this.setState({
          historicaldata: data2 || [],
          holdingsdata: data3 || [],
          pricedata: data4 || [],
          dividendsdata: data5 || [],  
          selected: selected,
        })
        this.props.globalLoading(false);
      })
      .catch(error => console.error('Error:', error));

  }

   componentDidMount(){
    window.addEventListener("resize", this.updateWindowDimensions());
    let overviewall = this.props.alloverviewdata.length;
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

      let selected = this.props.match.params.id;
      console.log(selected);
      let response = this.props.location.state.etf;
      console.log(response);

      if(!response){

        let url='https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected;
        fetch(url, {
          method: 'GET', // or 'PUT'
          // body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*'
          }
        }).then(res => res.json())
        .then(res => this.setState({overviewdata:res,loading:false,selected:selected}))
        .catch(error => console.error('Error:', error));
       
      }
      else{
        this.getData()
        this.setState({overviewdata:response,loading:false,selected:selected})
      }
    }


  componentWillReceiveProps(newProps){
    if(newProps.match.params.id !== this.props.match.params.id) {
      // this.setState({selected: newProps.match.params.id});
      console.log("PROPS CHANGED")
      this.getData(newProps.match.params.id)
    }

    
  } 



  render() {
    let selected = this.state.selected;
    let holdingsdata = this.state.holdingsdata;
    let historicaldata = this.state.historicaldata;
    let overviewdata = this.state.overviewdata;
    let dividenddata = this.state.dividendsdata;
    let pricedata = this.state.pricedata;
    let showgraph = this.state.showgraph;
    let showPerf = this.state.showPerf;
    let screenWidth = this.state.screenWidth;
    let alloverviewdata = this.props.alloverviewdata;
    // console.log("this is the id: ", this.props.match.params.id);
    // console.log(selected);
    // console.log('holdings: ', holdingsdata);
    // console.log('historical: ',historicaldata);
    // console.log('overview: ', overviewdata);
    // console.log(data);
    let tableholdings = [];
    let tablehistorical = [];
    let tableoverview = [];
    let histNAV = [];
    // console.log('loading? ',this.props.globalloading)

    let PremiumChart = <p> No Data </p>
    let NAVChart = <p> No Data </p>

    var options = {
        noDataText: 'Please load the data by clicking above!'
    };

    if (historicaldata instanceof Error){
      console.log('historical is null')
      historicaldata = []
    }
    if (holdingsdata instanceof Error){
      console.log('holdingsdata is null')
      holdingsdata = []
    }
    if (pricedata instanceof Error){
      console.log('pricedata is null')
      pricedata = []
    }
    if (dividenddata instanceof Error){
      console.log('dividend data is null')
      dividenddata = []
    }
    else{
       let formattedprice = NAVComparison(pricedata,100)
       

        if(historicaldata!='null'){

          var NAVPriceData = [];
          for(var i = 0; i < historicaldata.length; i++) {
            for(var j = 0; j < formattedprice.length; j++) {

              if (historicaldata[i].Date === formattedprice[j].Date) {

                let premium = 0
                if(parseFloat(historicaldata[i].NAV)>0){
                  premium = (parseFloat(formattedprice[j].Price)-parseFloat(historicaldata[i].NAV))/parseFloat(historicaldata[i].NAV)*100
                }
                
                NAVPriceData.push({
                  Date: historicaldata[i].Date, 
                  NAV: historicaldata[i].NAV, 
                  exchangeclose: formattedprice[j].Price,
                  premium: premium
                })

              }
            }
          }


      let histPrice = NAVPriceData.map(function(obj) {return parseFloat(obj.exchangeclose);});
      histPrice = histPrice.reverse()
      let dates = NAVPriceData.map(function(obj){ return obj.Date})
      dates = dates.reverse()
      let NAVpremium = NAVPriceData.map(function(obj) {return parseFloat(obj.premium);});
      NAVpremium = NAVpremium.reverse()

      const PremiumChartData= {
          
          labels: dates,
            datasets: [{
            label: selected+ ' NAV',
            //backgroundColor: 'rgb(255, 99, 132)',
            backgroundColor: "transparent",
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            pointRadius:0,
            data: NAVpremium,
          }
         ]
      }
      // let NAVChartData = {}



      var lineoptions = {
        scales:{
           yAxes: [{
              ticks: {
                  min: -1,
                  max: 1
              }
          }]
        }
      }

       var NAVlineoptions = {
        scales:{
           yAxes: [{
              ticks: {
                  min: -1,
                  max: 1
              }
          }]
        }
      } 

      PremiumChart = <Line data={PremiumChartData} options={lineoptions}/>
      

          // let temp_data = historicaldata;
          // temp_data.forEach(function(returndata) {

          //   var result = formattedprice.filter(function(value) {return value['Date'] === returndata['Date'];});

          //   returndata.exchangeclose = (result[0] !== undefined) ? result[0].Price : 0;
          //   });
          // console.log('joint ',temp_data);

        }

    }
    

    // console.log('holdings data: ', holdingsdata)
    if(holdingsdata){
      if (holdingsdata.length > 0){
        tableholdings = holdingsdata.slice(1);
      }
    }

    if(historicaldata != null){
      tablehistorical = historicaldata;
      // let ChartJSDate = historicaldata.map(function(obj){ return {x:parseFloat(moment(moment(obj.Date).format('D/MMM/YYYY')).unix()),y:parseFloat(obj.NAV)}})
      // ChartJSDate = ChartJSDate.reverse().slice(0,100)
      let ChartJSDate = historicaldata.map(function(obj){ return {x:moment(moment(obj.Date).format('D/MMM/YYYY')).toDate(),y:parseFloat(obj.NAV)}})
      ChartJSDate = ChartJSDate.reverse()

      const ChartJSoptions = {
      theme: "light2", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: selected+ ' Return',
      },
      axisY: {
        includeZero: false
      },
      axisX:{
       title: "Date",
       gridThickness: 1,
       // tickLength: 2000000000
      },
      data: [{
          type: "area",
          dataPoints: ChartJSDate
        }]
      }
      NAVChart =  <CanvasJSChart options = {ChartJSoptions} />

    }

    if(overviewdata){
      
      for (var key in overviewdata){
        var pair ={
        "field": key,
        "valueoffield": overviewdata[key]
        }
        tableoverview.push(pair);
      }
    }
    

    
    return (
      
      
      <div >

        <Nav {...this.props}/>
        <Glossary />
        <section id="Standard" style={{paddingTop:'2%'}}>
           
          <Container >
                <Spin tip="Loading Data" size="large" spinning={this.state.loading}>
        
                
                  Search for an ETF:
                  <Select
                    showSearch
                    style={{ width: "100%", paddingBottom:"2%", paddingLeft:"2%"}}
                    placeholder="Select an ETF"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    value={this.state.selected +" - " + this.state.overviewdata["Long Name"]}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >


                  {alloverviewdata.map(function(value, index){
                        return <Option value={ value["Bloomberg Ticker"] }>{value["Bloomberg Ticker"]+" - "+value["Long Name"]}</Option>;
                      })}

                  </Select>

                  {/*
                  <Button onClick={this.getData} style={{color:'white'}}> Load Data</Button>
                  */}
                   <Card>
                    <BasicOverview etf={overviewdata} />
                   </Card>
                </Spin>
                <Tabs onChange={callback} type="card" style={{paddingTop:"2%", backgroundColor:"white"}}>

                     <TabPane tab="Performance" key="1">
                     <Row>
                      Graph <Switch onChange={this.onPerfChange} /> Table
                    </Row>
                      <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>

                      {showPerf ? 

                      <BootstrapTable data={tablehistorical} striped pagination exportCSV options={options} >
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='NAV'>NAV</TableHeaderColumn>
                        <TableHeaderColumn dataField='NetAssets'>Net Assets</TableHeaderColumn>
                        <TableHeaderColumn dataField='SharesOutstanding'>Shares</TableHeaderColumn>
                        <TableHeaderColumn dataField='FundReturn'>FundReturn</TableHeaderColumn>
                        <TableHeaderColumn dataField='BenchmarkReturn'>BenchmarkReturn</TableHeaderColumn>
                      </BootstrapTable>
                    :
                      NAVChart
                    }

                        </Spin>

                      </TabPane>

                    <TabPane tab="Overview" key="2">
                    <Spin tip="Loading Data" size="large" spinning={this.state.loading}>
                      <BootstrapTable data={tableoverview} striped pagination exportCSV>
                        <TableHeaderColumn isKey dataField='field' dataSort>Field</TableHeaderColumn>
                        <TableHeaderColumn dataField='valueoffield'>Value</TableHeaderColumn>
                      </BootstrapTable>
                     </Spin>
                    </TabPane>

                    <TabPane tab="Holdings" key="3">
                    <Row>
                      Graph <Switch onChange={this.onTableChange} /> Table
                    </Row>
                    <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                    {showgraph ? 
                       <BootstrapTable data={tableholdings} striped pagination options={options}>
                        <TableHeaderColumn isKey dataField='isin' dataSort>ISIN</TableHeaderColumn>
                        <TableHeaderColumn dataField='underlyingname'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='country'>Country</TableHeaderColumn>
                        <TableHeaderColumn dataField='sector'>Sector</TableHeaderColumn>
                        <TableHeaderColumn dataField='weight'>Weight</TableHeaderColumn>

                      </BootstrapTable>
                    :

                      <SectorBreakdown holdings={holdingsdata} etfcount={1}/>
                    }
                    </Spin>
                    </TabPane>

                     <TabPane tab="Distributions" key="4">
                     <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                      <BootstrapTable data={dividenddata} striped pagination exportCSV options={options}>
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='ExDate'>Entitled Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='PayDate'>Paid Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='dist_amount'>Amount</TableHeaderColumn>
                        <TableHeaderColumn dataField='recorddate'>Record Date</TableHeaderColumn>

                      </BootstrapTable>
                      </Spin>
                    </TabPane>

                     <TabPane tab="Exchange Prices" key="5">
                     <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                      <BootstrapTable data={pricedata} striped pagination exportCSV options={options}>
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='Price'>Close</TableHeaderColumn>
                        <TableHeaderColumn dataField='Open'>Open</TableHeaderColumn>
                        <TableHeaderColumn dataField='Vol.'>Volume</TableHeaderColumn>
                        <TableHeaderColumn dataField='Change %'>Change</TableHeaderColumn>

                      </BootstrapTable>
                      </Spin>
                    </TabPane>
                    
                      <TabPane tab="NAV Premium" key="6">
                      <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                        {PremiumChart}
                        </Spin>
                      </TabPane>
                    
                  </Tabs>

 

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
)(ETFPage);

