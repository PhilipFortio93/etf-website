import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import {Container,Row} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from './actions/actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Card} from 'antd'

class TablePage extends Component {

  constructor(){
    super();

    this.state={

    };
  }

  render() {


    let overviewdata = this.props.alloverviewdata;

    overviewdata = overviewdata.sort(function(a,b){

        return (parseFloat(b["Securities Lending Return"])- parseFloat(a["Securities Lending Return"]));
      })

    console.log(overviewdata)
    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
          <Container>
            
          <Card>
                      <BootstrapTable data={overviewdata} striped pagination exportCSV >
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
