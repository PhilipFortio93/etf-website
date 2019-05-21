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
import {
  Slider, InputNumber, Row, Col, Tooltip, Modal, Button, Select, Tabs, Spin, Tag, Card, Switch
} from 'antd';
import "antd/dist/antd.css";
import "./etfpage.css";
import FacebookLogin from 'react-facebook-login';

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

export default class Standard extends React.Component {



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
      loading:true,
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
    this.setState({loading:true});

    let selected = value;
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
    .then(res => this.setState({overviewdata:res,loading:false,selected:value}))
    .catch(error => console.error('Error:', error));

  }
  onTableChange(value){
    console.log(value)
    this.setState({showgraph:value})
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
        console.log(url);
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
        this.setState({overviewdata:response,loading:false,selected:selected})
      }
    }

  getData(){

    this.setState({loading:true});
    // const Http = new XMLHttpRequest();
    let selected = this.state.selected;

      Promise.all([
        fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/overview?etf-id='+selected, {
          method: 'GET', // or 'PUT'
          // body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*'
          }
        }),
        fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/historical?etf-id='+selected, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              // 'Access-Control-Allow-Origin':'*'
            }
          }),
        fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/holdings?etf-id='+selected, {
          method: 'GET', // or 'PUT'
          // body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*'
          }
        }),
        fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/prices?etf-id='+selected, {
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
        })
      ])
      .then(([res1, res2, res3, res4, res5]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()]))
      .then(([data1, data2, data3, data4, data5]) => this.setState({
          overviewdata: data1, 
          historicaldata: data2,
          holdingsdata: data3,
          pricedata: data4,
          dividenddata: data5,
          loading: false
      }));

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
    // console.log("this is the id: ", this.props.match.params.id);
    // console.log(selected);
    // console.log('holdings: ', holdingsdata);
    console.log('historical: ',historicaldata);
    // console.log('overview: ', overviewdata);
    // console.log(data);
    let tableholdings = [];
    let tablehistorical = [];
    let tableoverview = [];

    let histNAV = historicaldata.map(function(obj) {return parseFloat(obj.NAV);});
    histNAV = histNAV.reverse()
    let dates = historicaldata.map(function(obj){ return obj.Date})
    dates = dates.reverse()
    const LineChartData= {
        
        labels: dates,
          datasets: [{
          label: selected+ ' NAV',
          //backgroundColor: 'rgb(255, 99, 132)',
          backgroundColor: "transparent",
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          pointRadius:0,
          data: histNAV,
        }
        ]
    }

    var options = {
        noDataText: 'Please load the data by clicking above!'
    };

    if (historicaldata == 'null'){
      console.log('historical is null')
      historicaldata = []
    }
    if (holdingsdata == 'null'){
      console.log('holdingsdata is null')
      holdingsdata = []
    }
    if (pricedata == 'null'){
      console.log('holdingsdata is null')
      pricedata = []
    }
    if (dividenddata == 'null'){
      console.log('dividend data is null')
      pricedata = []
    }
    console.log('holdings data: ', holdingsdata)
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
        
        <section id="Standard" style={{paddingTop:'2%'}}>
           
          <Container >
            <Spin tip="Loading..." spinning={this.state.loading}>
        
                
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
                  value={this.state.selected}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >


                {names.map(function(name, index){
                    return <Option value={ name }>{name}</Option>;
                  })}


                </Select>

                <Button onClick={this.getData} style={{color:'white'}}> Load Data</Button>

                 
                  <BasicOverview etf={overviewdata} />

                <Tabs onChange={callback} type="card" style={{paddingTop:"2%", backgroundColor:"white"}}>
                    <TabPane tab="Overview" key="1">

                      <BootstrapTable data={tableoverview} striped pagination exportCSV>
                        <TableHeaderColumn isKey dataField='field' dataSort>Field</TableHeaderColumn>
                        <TableHeaderColumn dataField='valueoffield'>Value</TableHeaderColumn>
                      </BootstrapTable>

                    </TabPane>
                    <TabPane tab="Historical NAV" key="2">
                      <BootstrapTable data={tablehistorical} striped pagination exportCSV options={options} >
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='NAV'>NAV</TableHeaderColumn>
                        <TableHeaderColumn dataField='NetAssets'>Net Assets</TableHeaderColumn>
                        <TableHeaderColumn dataField='SharesOutstanding'>Shares</TableHeaderColumn>
                        <TableHeaderColumn dataField='FundReturn'>FundReturn</TableHeaderColumn>
                        <TableHeaderColumn dataField='BenchmarkReturn'>BenchmarkReturn</TableHeaderColumn>
                      </BootstrapTable>


                    </TabPane>
                    <TabPane tab="Holdings" key="3">
                    <Row>
                      Table<Switch onChange={this.onTableChange} />Graph
                    </Row>
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
                    </TabPane>

                     <TabPane tab="Distributions" key="4">

                      <BootstrapTable data={dividenddata} striped pagination exportCSV options={options}>
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='ExDate'>Entitled Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='PayDate'>Paid Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='dist_amount'>Amount</TableHeaderColumn>
                        <TableHeaderColumn dataField='recorddate'>Record Date</TableHeaderColumn>

                      </BootstrapTable>

                    </TabPane>

                     <TabPane tab="Exchange Prices" key="5">

                      <BootstrapTable data={pricedata} striped pagination exportCSV options={options}>
                        <TableHeaderColumn isKey dataField='Date' dataSort>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='Price'>Close</TableHeaderColumn>
                        <TableHeaderColumn dataField='Open'>Open</TableHeaderColumn>
                        <TableHeaderColumn dataField='Vol.'>Volume</TableHeaderColumn>
                        <TableHeaderColumn dataField='Change %'>Change</TableHeaderColumn>

                      </BootstrapTable>

                    </TabPane>
                      <TabPane tab="Graph" key="6">
                        <Line data={LineChartData} />
                      </TabPane>
                  </Tabs>

                  </Spin>

          </Container>

        </section>
        <Footer/>
      </div>
    );
  }
}
