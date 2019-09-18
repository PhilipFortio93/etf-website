import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import ETFCard from './components/ETFCard'
import {Container,Row} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Card, Select, Spin, Table} from 'antd'
import DatePicker from 'react-datepicker';
import "./toppage.css";

// var moment = require('moment');
var moment = require('moment-business-days');

const Option = Select.Option;

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  

class TopPage extends Component {


  constructor(){
    super();

    this.state={
      startDate:moment().prevBusinessDay().prevBusinessDay().toDate(),
      endDate:moment().prevBusinessDay().toDate(),
      testdata:[]
    };
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }


  componentDidMount(){

      let enddate = moment(this.state.endDate).format('YYYY-MM-DD');
      let startdate = moment(this.state.startDate).format('YYYY-MM-DD');
      console.log("we're getting all the data");
      this.props.globalLoading(true);
      let url ='https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/gettopetfs?startdate=' + enddate + '&enddate=' + startdate
      // let url = 'https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/etfcompperformance?etf-id=ISF&startdate=2019-01-04&enddate=2019-02-04'
      fetch(url, {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
      .then(res => {
        this.setState({testdata:res})
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));

    }

  handleDateChange(event){
    let startdate = moment(event).format('YYYY-MM-DD');
    let enddate = moment(this.state.endDate).format('YYYY-MM-DD');
    // let startdatestr = this.state.startdate.yyyymmdd();
    console.log(startdate);
    console.log(enddate);
    // this.setState({endDate: event});

          console.log("we're getting all the data");
      this.props.globalLoading(true);
      let url ='https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/gettopetfs?startdate=' + enddate + '&enddate=' + startdate
      // let url = 'https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/etfcompperformance?etf-id=ISF&startdate=2019-01-04&enddate=2019-02-04'
      fetch(url, {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
      .then(res => {
        this.setState({testdata:res, startDate:event})
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));
  }

  handleEndDateChange(event){
    let startdate = moment(this.state.startDate).format('YYYY-MM-DD');
    let enddate = moment(event).format('YYYY-MM-DD');
    // let startdatestr = this.state.startdate.yyyymmdd();
    console.log(startdate);
    console.log(enddate);
    // this.setState({endDate: event});

          console.log("we're getting all the data");
      this.props.globalLoading(true);
      let url ='https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/gettopetfs?startdate=' + enddate + '&enddate=' + startdate
      console.log(url)
      // let url = 'https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/etfcompperformance?etf-id=ISF&startdate=2019-01-04&enddate=2019-02-04'
      fetch(url, {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
      .then(res => {
        this.setState({testdata:res, endDate:event})
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));

  }



  render() {

    let testdata = this.state.testdata;
    let tabledata = []

    var options = {
        noDataText: 'Please load the data by clicking above!'
    };

    if (testdata["data"]){
      console.log('testdata: ', testdata["data"])
       
      tabledata = testdata["data"]
    }

    console.log('test: ', moment().prevBusinessDay().format('YYYY-MM-DD'))

    const columns = [
      {
        title: <div className="hideme"> Isin </div>,
        dataIndex: 'ISIN',
        render: isin => (
          <span className="hideme">
            {isin}
          </span>
        ),
      },
      {
        title: <div className="hideme"> Ticker </div>,
        dataIndex: 'shortname',
        render: ticker => (
          <span className="hideme">
            {ticker}
          </span>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'LongName',
      },
      {
        title: 'Currency',
        dataIndex: 'Currency',
      },
            {
        title: 'Asset',
        dataIndex: 'AssetClass',
      },
            {
        title: <div className="hideme"> Category </div>,
        dataIndex: 'BroadCategory',
        render: category => (
          <span className="hideme">
            {category}
          </span>
        ),
      },
            {
        title: <div className="hideme"> Fund Size </div>,
        dataIndex: 'FundAssets',
        render: fund_size => (
          <span className="hideme">
            {fund_size}
          </span>
        ),
      },
      {
        title: 'Performance',
        dataIndex: 'Change',
        render: tags => (
          <span>
            {tags.toString().substring(0,tags.toString().indexOf(".")+3)+'%'}
          </span>
        ),
      }
    ];


    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
        <Spin tip="Loading Data" size="large" spinning={this.props.globalloading}>
          <Container>
          
                <Row className='datetutorial'>
                <label onClick={e => e.preventDefault()} style={{ paddingRight:'5%', width:"40%", fontSize:'15px', display: 'inline-block'}}>
                  Start Date:
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                      dateFormat="dd/MM/yyyy"
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
                      dateFormat="dd/MM/yyyy"
                      withPortal
                      popperPlacement='top-end'
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                  />
                </label>
                </Row>

          </Container>
          {/*}
          <Container>
          
                       <BootstrapTable data={tabledata} striped pagination options={options}>
                        <TableHeaderColumn isKey dataField='ISIN' dataSort>ISIN</TableHeaderColumn>
                        <TableHeaderColumn dataField='shortname'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='enddate'>From</TableHeaderColumn>
                        <TableHeaderColumn dataField='startdate'>To</TableHeaderColumn>
                        <TableHeaderColumn dataField='Change'>Perf</TableHeaderColumn>
                      </BootstrapTable>
                    
           </Container>
          */}
           <Container>
             <Table columns={columns} dataSource={tabledata} />
           </Container>
           </Spin>
        </section>


        <Footer />
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
)(TopPage);
