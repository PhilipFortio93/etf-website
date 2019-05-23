import React from 'react';
import Nav from './components/Nav';  
import Footer from './components/Footer';
import SpecialTag from './components/SpecialTag';
import BasicOverview from './components/BasicOverview';
import {Container} from 'reactstrap';
import DailyReturns from './tooldata/DailyReturns.json';
import {Line, Bar} from 'react-chartjs-2';
import Glossary from './components/Glossary';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
  Slider, InputNumber, Row, Col, Tooltip, Modal, Button, Select, Tabs, Spin, Tag, Card, Radio, Switch, Icon, message
} from 'antd';
import "antd/dist/antd.css";
import "./etfsearch.css";
import FacebookLogin from 'react-facebook-login';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import GroupedComponentTwo from './components/GroupedComponentTwo';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;



  function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  function search(user){
      return Object.keys(this).every((key) => user[key] === this[key]);
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

const InitialState = {
      visible:false,
      selected:'Select',
      overviewdata:[],
      loading:true,
      query:{
        "Asset Class": 'All',
        "Base Currency":'All',
        "Benchmark Index":'All',
        "Use of Income":'All',
      },
      fee:2,
      group: false,
      etf:{},
      id:'',
      orderby:'Total Expense Ratio',
      
    }

class ETFSearch extends React.Component {



  constructor() {
    super();

    this.state = localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : InitialState;
    this.onChange = this.onChange.bind(this);
    this.onChangeAC = this.onChangeAC.bind(this);
    this.onChangeCurr = this.onChangeCurr.bind(this);
    this.onChangeIndex = this.onChangeIndex.bind(this);
    this.onChangeIncome = this.onChangeIncome.bind(this);
    this.handleChangeFee = this.handleChangeFee.bind(this);
    this.onGroupByChange = this.onGroupByChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onOrderByChange = this.onOrderByChange.bind(this);

  }

  addToPortfolio = (e) => {
    e.preventDefault();

    console.log('props: ', this.props)
    this.setState({
      visible: false,

    });

    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description["Bloomberg Ticker"].substr(0,4).trim();
    })

    let exist = portfolio.indexOf(this.props.etf["Bloomberg Ticker"].substr(0,4).trim())

    if(exist==-1){ // Can't add the same ETF twice to the portfolio
      
      let count = portfolio.length;
      if(count >4){
        message.error("Your account can't have more than 5 ETFs in a portfolio");
      }
      if (count <5){
        this.props.globalLoading(true);

        let selected = this.props.etf["Bloomberg Ticker"].substr(0,4).trim();

        console.log(selected, ' added to portfolio')
      
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
              })
          ])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => {
              console.log("got data for ETF")
              this.props.createItem({"description":this.props.etf,"data": data1,"divs":data2});
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
  showModal = (value) => {
    let overviewdata = this.props.alloverviewdata;
    let selected = value;

    console.log("overview: ", overviewdata);
    console.log("selected2: ", value);

    let etf = overviewdata.filter(function(val){
      return val["Bloomberg Ticker"] == selected;
    })[0]

    let id = etf["Bloomberg Ticker"].substr(0,4)
    this.setState({
      visible: true,
      selected: value,
      etf: etf,
      id: id,
    });
  }

  onReset(){
    this.setState({
      query:{
        "Asset Class": 'All',
        "Base Currency":'All',
        "Benchmark Index":'All',
        "Use of Income":'All',
      }
    });
  }
  handleOk = (e) => {

    let etf = this.state.etf;
    let id = this.state.id;
    console.log('props in etfsearch: ',this.props)
    this.setState({
      visible: false,
    });
    let route = {
      pathname:"/etfsearch/"+id,
      state:{
         etf:etf
      }
    }

    this.props.history.push(route)
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onOrderByChange(e){
    console.log(e.target.value);
    this.setState({orderby:e.target.value})
  }

  onGroupByChange(checked){
    console.log(checked);
    this.setState({group:checked});
  }

  onChange(value) {
    this.setState({selected:value});
  }

  onChangeAC(value){
    this.setState({
      query:
        {
          "Asset Class":value,
          "Base Currency":this.state.query["Base Currency"],
          "Benchmark Index":'All',
          "Use of Income":this.state.query["Use of Income"],
        }

      });
  }

  onChangeCurr(value){
    this.setState({
      query:
        {
           "Asset Class":this.state.query["Asset Class"],
           "Base Currency":value,
           "Benchmark Index":'All',
           "Use of Income":this.state.query["Use of Income"],
        }

       });
  }

  onChangeIndex(value){
    this.setState({
      query:
        {
           "Asset Class":this.state.query["Asset Class"],
           "Base Currency":this.state.query["Base Currency"],
           "Benchmark Index":value,
           "Use of Income":this.state.query["Use of Income"],
        }

       });
  }

  onChangeIncome(value){
    this.setState({
      query:
        {
           "Asset Class":this.state.query["Asset Class"],
           "Base Currency":this.state.query["Base Currency"],
           "Benchmark Index":'All',
           "Use of Income":value,
        }

       });
  }

  handleChangeFee(value){
    this.setState({fee:value})
  }



  componentWillUnmount() {
  // Remember state for the next mount
    localStorage.setItem('appState', JSON.stringify(this.state));
  }


  componentDidMount(){



    let overviewall = this.props.alloverviewdata.length;

    if(!overviewall){
      console.log("we're getting all the data");
      this.props.globalLoading(true);

      fetch('https://xo34ffd2ah.execute-api.us-east-1.amazonaws.com/CORSenable/alloverview', {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin':'*'
        }
      }).then(res => res.json())
      .then(res => {
        this.props.loadalloverview(res);
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));
      }
    }

  render() {

    let selected = this.state.selected;
    let overviewdata = this.props.alloverviewdata;
    let overviewdatafilter = [];
    let query = this.state.query;
    let group = this.state.group;
    // console.log(query);
    console.log('selected: ', selected);

    let etf = this.state.etf;

    console.log('etf: ',etf);

    let id = this.state.id;
    let newquery = {};
    let fee = this.state.fee;
    let tooltipon = this.state.tooltipon;

    let tableoverview = [];
    // let namestwo = [];
    let AssetClass = [];
    let BaseCurrency = [];
    let Index = [];
    let IncomeList = [];
    // namestwo = overviewdata.map(function(obj) {return obj["Bloomberg Ticker"];});


    AssetClass = overviewdata.map(function(obj) {return obj["Asset Class"];});
    AssetClass = [...new Set(AssetClass)];//AssetClass.filter(distinct);
    AssetClass.push("All");

    BaseCurrency = overviewdata.map(function(obj) {return obj["Base Currency"];});
    BaseCurrency = [...new Set(BaseCurrency)];
    BaseCurrency.push("All");

    IncomeList = overviewdata.map(function(obj) {return obj["Use of Income"];});
    IncomeList = [...new Set(IncomeList)];
    IncomeList.push("All");


    for (var key in query){
      if (query[key]!='All'){
        newquery[key]=query[key]
      }
    }
    // console.log('new query: ',newquery);
    // query = {
    //   "Asset Class": assetchoice,
    //   "Base Currency": basecurr
    // };

    overviewdatafilter = overviewdata.filter(search, newquery);
    overviewdatafilter = overviewdatafilter.filter(function(obj){
      return parseFloat(obj["Total Expense Ratio"] ) <= fee;
    })

    let sortparameter = this.state.orderby;

    overviewdatafilter = overviewdatafilter.sort(function(a,b){
      if(sortparameter=="Net Assets"){
        // console.log(a["Bloomberg Ticker"])
        // console.log(parseFloat(a[sortparameter].substring(4).replace(/,/g,"")))
        return parseFloat(b[sortparameter].substring(4).replace(/,/g,""))- parseFloat(a[sortparameter].substring(4).replace(/,/g,""));
      }
      else{
         return parseFloat(a[sortparameter])- parseFloat(b[sortparameter]);
      }
      
    })

    Index = overviewdatafilter.map(function(obj) {return obj["Benchmark Index"];});
    Index = [...new Set(Index)];
    Index.push("All");


    var groupedoverview = groupBy(overviewdatafilter, function(obj) {
      return obj["Asset Class"];
    });

    // console.log(groupedoverview)

    let groupedcomponent = <GroupedComponentTwo datareq={groupedoverview} />

    return (
      
      
      <div >

        <Nav {...this.props}/>
         <Glossary />
        <section id="Standard" style={{paddingTop:'2%'}}>
            
             <Modal
                title={etf["Bloomberg Ticker"]}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[
                  <Button style={{width:"20%"}} key="back" type="primary"onClick={this.handleCancel}>Close</Button>,


                    <Button style={{width:"36%"}} key="submit" type="primary" onClick={this.handleOk}>
                    {/*}
                      <Link to={{
                        pathname:"/etfsearch/"+id,
                        state:{
                           etf:etf
                        }
                      }}>
                      Find Out More?
                      </Link>
                    */}
                    Find Out More?
                    </Button>,

                  
                ]}

              >
                <BasicOverview etf={etf} />
              </Modal>
    
          
            
              <Container >
                
                Search for an ETF:
                <Spin tip="Loading..." spinning={this.props.globalloading}>
                  <Select
                    showSearch
                    style={{ width: "100%", paddingBottom:"2%", paddingLeft:"2%"}}
                    placeholder="Select an ETF"
                    optionFilterProp="children"
                    onChange={this.showModal}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    value={this.state.selected}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >

                  
                    {overviewdata.map(function(value, index){
                        return <Option value={ value["Bloomberg Ticker"] }>{value["Bloomberg Ticker"]+" - "+value["Long Name"]}</Option>;
                      })}


                  </Select>
                </Spin>

                <Card>  
                <Button type="primary" onClick={this.onReset}>Reset</Button>

                <Row>
                Asset Class:
                <Select
                  showSearch
                  style={{ width: 200, paddingBottom:"2%", paddingLeft:"2%", paddingRight:"2%"}}
                  placeholder="Select Asset Class"
                  optionFilterProp="children"
                  onChange={this.onChangeAC}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  value={this.state.query["Asset Class"]}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >


                {AssetClass.map(function(name, index){
                    return <Option value={ name }>{name}</Option>;
                  })}


                </Select>

                Base Currency:
                <Select
                  showSearch
                  style={{ width: 200, paddingBottom:"2%", paddingLeft:"2%"}}
                  placeholder="Select Currency"
                  optionFilterProp="children"
                  onChange={this.onChangeCurr}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  value={this.state.query["Base Currency"]}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >


                {BaseCurrency.map(function(name, index){
                    return <Option value={ name }>{name}</Option>;
                  })}


                </Select>

                Income:
                <Select
                  showSearch
                  style={{ width: 200, paddingBottom:"2%", paddingLeft:"2%"}}
                  placeholder="Select Income"
                  optionFilterProp="children"
                  onChange={this.onChangeIncome}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  value={this.state.query["Use of Income"]}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >


                {IncomeList.map(function(name, index){
                    return <Option value={ name }>{name}</Option>;
                  })}


                </Select>
                 Benchmark Index:
                <Select
                  showSearch
                  style={{ width: 200, paddingBottom:"2%", paddingLeft:"2%"}}
                  placeholder="Select Index"
                  optionFilterProp="children"
                  onChange={this.onChangeIndex}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  value={this.state.query["Benchmark Index"]}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >


                {Index.map(function(name, index){
                    return <Option value={ name }>{name}</Option>;
                  })}


                </Select>
                <Col>
                Fee
                <Slider
                  min={0}
                  max={1}
                  onChange={this.handleChangeFee}
                  value={typeof fee === 'number' ? fee : 0}
                  step={0.01}
                  tipFormatter={(value) => `${value}%`}
                />
                </Col>
                </Row>
                <h5> Group By </h5>
                Asset Class:  
                <Switch onChange={this.onGroupByChange} />
                Fund Size:

                {/*
                <h5> Group By </h5>
                <RadioGroup style={{paddingBottom:"2%"}}>
                  <Radio value={1}>1 Month</Radio>
                  <Radio value={2}>3 Months</Radio>
                  <Radio value={3}>1 Year</Radio>
                  <Radio value={4}>3 Years</Radio>
                  <Radio value={5}>5 Years</Radio>
                </RadioGroup>
                */}

                <h5> Order By </h5>
                <Row>
                <RadioGroup onChange={this.onOrderByChange} style={{paddingBottom:"2%"}}>
                  <Radio value={"Total Expense Ratio"}>Fee</Radio>
                  <Radio value={"Distribution Yield"}>Yield</Radio>
                  <Radio value={"Net Assets"}>Size of Fund</Radio>
                </RadioGroup>
                </Row>
                </Card>


                 <Card style={{padding:"1%", marginTop:"2%", marginBottom:"2%"}}>
                 
                   <Spin tip="Loading..." spinning={this.props.globalloading}>
                   <h5 style={{ marginBottom: 8 }}>ETFs:</h5>

                     <Row style={{align:'middle'}}>
                         <div style={{ marginTop: 8 }}>


                           {groupedcomponent}

                         </div>
            
                    </Row>
                    </Spin>

                 </Card>

                  {/*
                 <Card style={{padding:"1%", marginTop:"2%", marginBottom:"2%"}}>

                 <h5 style={{ marginBottom: 8 }}>ETFs:</h5>

                       <div style={{ marginTop: 8 }}>
                         {groupedoverview.map(function(value, index){
                           return <SpecialTag etf={value} />
                        })}

                       </div>

                 </Card>
                  */}
                  

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
)(ETFSearch);

