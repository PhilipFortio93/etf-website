import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import ETFCard from './components/ETFCard'
import {Container,Row} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Card, Select} from 'antd';

const Option = Select.Option;

var moment = require('moment');


  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }


class TablePage extends Component {

  constructor(){
    super();

    this.state={
      selected:'',
      selectedlist:['Securities Lending Return'],
      headeroptions:[]
    };
    this.changeHeader = this.changeHeader.bind(this);
  }

  createCustomInsertButton = (onClick) => {
    return (
      <button style={ { color: 'red' } } onClick={ onClick }>Add rows</button>
    );
  }

  changeHeader(value){
    this.setState({selected:value})
  }


  render() {


    const tableoptions = {
      sizePerPage: 25,
      defaultSortName: 'Securities Lending Return',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      insertBtn: this.createCustomInsertButton
    }
    let selectedlist = this.state.selectedlist;

    let overviewdata = this.props.alloverviewdata;

    let headeroptions = this.state.headeroptions;

    overviewdata = overviewdata.sort(function(a,b){

        return (parseFloat(b["Securities Lending Return"])- parseFloat(a["Securities Lending Return"]));
      })

    console.log(overviewdata)
    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
          <Container>


          </Container>
          <Container>
          <Card>
            Rank ETFs by:
            <Select
            showSearch
            style={{ width: "100%", paddingBottom:"2%", paddingLeft:"2%"}}
            placeholder="Select an ETF"
            optionFilterProp="children"
            onChange={this.changeHeader}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            value={this.state.selected}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

          
            {headeroptions.map(function(value, index){
                return <Option value={ value }>{value}</Option>;
              })}


          </Select>

            <ETFCard />
           </Card>
          <Card>
                      <BootstrapTable data={overviewdata} striped pagination exportCSV options={tableoptions}>
                        <TableHeaderColumn isKey dataField='Bloomberg Ticker' dataSort>Ticker</TableHeaderColumn>
                        <TableHeaderColumn dataField='Long Name'>Long Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='Securities Lending Return'>Sec Lending</TableHeaderColumn>
                        

                      </BootstrapTable>
              
            </Card>
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
)(TablePage);
