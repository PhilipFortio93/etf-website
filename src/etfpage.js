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
      products:[],
      selected:'',
      overviewdata:{},
      holdingsdata: [],
      historicaldata: [],
      dividendsdata: [],
      pricedata: [],
      loading: false,
      alldata: [],
      showgraph:false,
      screenWidth:null,
    };

    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
  }
  
  updateWindowDimensions() {
   this.setState({ screenWidth: window.innerWidth });
  }

  onChange(value) {
    this.setState({loading:true})
    let selected = value.substr(0,4).trim();
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
        console.log('data5:',data5)
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
     let url = 'https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/'
     fetch(url, {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin':'*'
        }
      }).then(res => res.json())
      .then(res => this.setState({products:res}))
      .catch(error => console.error('Error:', error));
    
      let selected = this.props.match.params.id;
      console.log(selected);
      let response = this.props.location.state.etf;
      console.log(response);

      if(!response){

         url='https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected;
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
    //const slxx = slxxdata;
    let names = this.state.products;
    let username = this.state.username;
    let password = this.state.password;
    let token = this.state.fbook_token;
    let fbook_name = this.state.name;
    let fbook_id = this.state.fb_id;
    let selected = this.state.selected;
    let holdingsdata = this.state.holdingsdata;
    let historicaldata = this.state.historicaldata;
    let overviewdata = this.state.overviewdata;
    let dividenddata = this.state.dividendsdata;
    let pricedata = this.state.pricedata;
    let showgraph = this.state.showgraph;
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
    // console.log('loading? ',this.props.globalloading)

    let LineChart = <p> No Data </p>
    
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


      let histNAV = NAVPriceData.map(function(obj) {return parseFloat(obj.NAV);});
      histNAV = histNAV.reverse()
      let histPrice = NAVPriceData.map(function(obj) {return parseFloat(obj.exchangeclose);});
      histPrice = histPrice.reverse()
      let dates = NAVPriceData.map(function(obj){ return obj.Date})
      dates = dates.reverse()
      let NAVpremium = NAVPriceData.map(function(obj) {return parseFloat(obj.premium);});
      NAVpremium = NAVpremium.reverse()
      // const LineChartData= {
          
      //     labels: dates,
      //       datasets: [{
      //       label: selected+ ' NAV',
      //       //backgroundColor: 'rgb(255, 99, 132)',
      //       backgroundColor: "transparent",
      //       borderColor: 'rgb(255, 99, 132)',
      //       borderWidth: 1,
      //       pointRadius:0,
      //       data: histNAV,
      //     },{
      //       label: selected+ ' Price',
      //       //backgroundColor: 'rgb(255, 99, 132)',
      //       backgroundColor: "transparent",
      //       borderColor: 'rgb(255, 99, 132)',
      //       borderWidth: 1,
      //       pointRadius:0,
      //       data: histPrice,
      //     }
      //    ]
      // }

      const LineChartData= {
          
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
      LineChart = <Line data={LineChartData} options={lineoptions}/>

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

                  {/*
                  {names.map(function(name, index){
                      return <Option value={ name }>{name}</Option>;
                    })}
                */}

                  </Select>

                  {/*
                  <Button onClick={this.getData} style={{color:'white'}}> Load Data</Button>
                  */}
                   
                    <BasicOverview etf={overviewdata} />
                </Spin>
                <Tabs onChange={callback} type="card" style={{paddingTop:"2%", backgroundColor:"white"}}>
                    <TabPane tab="Overview" key="1">
                    <Spin tip="Loading Data" size="large" spinning={this.state.loading}>
                      <BootstrapTable data={tableoverview} striped pagination exportCSV>
                        <TableHeaderColumn isKey dataField='field' dataSort>Field</TableHeaderColumn>
                        <TableHeaderColumn dataField='valueoffield'>Value</TableHeaderColumn>
                      </BootstrapTable>
                     </Spin>
                    </TabPane>
                    <TabPane tab="Historical NAV" key="2">
                    <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                      <BootstrapTable data={tablehistorical} striped pagination exportCSV options={options} >
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='NAV'>NAV</TableHeaderColumn>
                        <TableHeaderColumn dataField='NetAssets'>Net Assets</TableHeaderColumn>
                        <TableHeaderColumn dataField='SharesOutstanding'>Shares</TableHeaderColumn>
                        <TableHeaderColumn dataField='FundReturn'>FundReturn</TableHeaderColumn>
                        <TableHeaderColumn dataField='BenchmarkReturn'>BenchmarkReturn</TableHeaderColumn>
                      </BootstrapTable>
                      </Spin>

                    </TabPane>
                    <TabPane tab="Holdings" key="3">

                    <Row>
                      Table<Switch onChange={this.onTableChange} />Graph
                    </Row>
                    <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                    {showgraph ? 
                      <SectorBreakdown holdings={holdingsdata} />
                    :
                      <BootstrapTable data={tableholdings} striped pagination options={options}>
                        <TableHeaderColumn isKey dataField='isin' dataSort>ISIN</TableHeaderColumn>
                        <TableHeaderColumn dataField='underlyingname'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='country'>Country</TableHeaderColumn>
                        <TableHeaderColumn dataField='sector'>Sector</TableHeaderColumn>
                        <TableHeaderColumn dataField='weight'>Weight</TableHeaderColumn>

                      </BootstrapTable>
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
                    
                      <TabPane tab="Graph" key="6">
                      <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
                        {LineChart}
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

