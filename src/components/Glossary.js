import React from 'react';
import BasicOverview from './BasicOverview';

import {
  Collapse, Drawer, Button, Card
} from 'antd';
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
import SpecialTag from './SpecialTag';
import ETFSearch from '../etfsearch';

const Panel = Collapse.Panel;

class Glossary extends React.Component {

  constructor(){
    super();
    this.state={
       visible:false,

    }
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.props.showGlossary(false)
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  componentWillReceiveProps(newProps) {
    if(this.props.glossaryvisible!== this.props.visible) {
      this.setState({visible: this.props.glossaryvisible});
    }
    //  if(newProps.etf["Bloomberg Ticker"].substr(0,4) !== this.props.etf["Bloomberg Ticker"].substr(0,4)) {
    //   this.setState({id: newProps.etf["Bloomberg Ticker"].substr(0,4)});
    // }
  }

  componentDidMount(){
    // console.log(this.props.etf);

  }

  render(){

    let portfolioredux = this.props.portfolioredux;
    let portfolio = this.props.portfolioredux.map(function(value){
      return value.description;
    })
    let overviewall = this.props.alloverviewdata;
    let glossary = overviewall.map(function(value,index){
      return <Panel header={value["Bloomberg Ticker"]+" - "+value["Asset Class"]+" - "+value["Long Name"]} key={index}>{value["Description"]}</Panel>
    })
    //for key in blah blah blah
    return(
      <>  
      {/*
        <Button  type="primary" onClick={this.showDrawer}> Glossary/ Portfolio </Button>
      */}
          <Drawer
            title="Glossary"
            placement="right"
            closable={true}
            width={"50%"}
            onClose={this.onClose}
            visible={this.props.glossaryvisible}
          >
          
          <Card style={{marginBottom:'2%'}}>

          <h5> Current Portfolio </h5>
          <div style={{ marginTop: 8 }}>
                 {portfolio.map(function(value, index){
                   return <SpecialTag etf={value} />
                })}

               </div>

          </Card>
          
          <p> A list of descriptions of ETFs </p>


          <Collapse className="glossary" bordered={false}>
            {glossary}
          </Collapse>

          </Drawer> 
      
      </>
    )

  }
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio,
    glossaryvisible: state.portfolioReducer.showGlossary,
    alloverviewdata:state.portfolioReducer.alldata
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  updateWeight: (id, weight) => dispatch(portfolioActions.updateWeight(id,weight)),
  showGlossary: (show) => dispatch(portfolioActions.showGlossary(show))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Glossary);
