import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import ETFCard from './components/ETFCard'
import {Container,Row} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Card, Select, Spin} from 'antd'
import DatePicker from 'react-datepicker';

var moment = require('moment');

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
  


class CompDiff extends Component {


  constructor(){
    super();

    this.state={
      selected:"",
      overviewdata:{"Long Name":""},
      startDate:new Date(2019,7,25),
      endDate:new Date(2019,8,30),
      startDateHoldings:[],
      endDateHoldings:[],
      testdata:{}
    };
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount(){

      console.log("we're getting all the data");
      this.props.globalLoading(true);
      // let url ='https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/gettopetfs'
      let url = 'https://mkwvp3u9ik.execute-api.us-east-1.amazonaws.com/Test/etfcompperformance?etf-id=ISF&startdate=2019-01-04&enddate=2019-02-04'
      fetch(url, {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
      }).then(res => res.json())
      .then(data => {
        this.setState({testdata:data})
        this.props.globalLoading(false);
        })
      .catch(error => console.error('Error:', error));

    }

  handleDateChange(event){
     this.setState({startDate: event});
  }

  handleEndDateChange(event){
    this.setState({endDate: event});
  }


  onChange(value) {

    let selected = value.substr(0,value.indexOf(' '));
    this.props.globalLoading(true);
    let today = moment().format("YYYY-MM-DD")
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
      this.setState({overviewdata:res,selected:selected});

      let id = selected;

    })
    .catch(error => console.error('Error:', error));
    
    fetch('https://etf-data-dumps.s3.amazonaws.com/'+today.toString()+'/'+selected +'/Holdings.json', {
      method: 'GET', // or 'PUT'
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':'*'
      }
    }).then(res => res.json())
    .then(res => {
      this.setState({startDateHoldings:res});
      this.props.globalLoading(false);

    })
    .catch(error => console.error('Error:', error));

  }

  render() {

    let alloverviewdata = this.props.alloverviewdata;
    let tableholdings = this.state.startDateHoldings;
    let testdata = this.state.testdata;
    tableholdings = tableholdings.slice(1,tableholdings.length)
    console.log(tableholdings);
    var options = {
        noDataText: 'Please load the data by clicking above!'
    };

    console.log('testdata: ',testdata)
    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
          <Container>
            <Spin tip="Loading..." spinning={this.props.globalloading}>
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
               </Spin>

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
          <Container>
                       <BootstrapTable data={tableholdings} striped pagination options={options}>
                        <TableHeaderColumn isKey dataField='isin' dataSort>ISIN</TableHeaderColumn>
                        <TableHeaderColumn dataField='underlyingname'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='country'>Country</TableHeaderColumn>
                        <TableHeaderColumn dataField='sector'>Sector</TableHeaderColumn>
                        <TableHeaderColumn dataField='weight'>Weight</TableHeaderColumn>

                      </BootstrapTable>
           </Container>

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
)(CompDiff);
