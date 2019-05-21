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
            width={"75%"}
            onClose={this.onClose}
            visible={this.props.glossaryvisible}
          >
          <Card>

          <h5> Current Portfolio </h5>
          <div style={{ marginTop: 8 }}>
                 {portfolio.map(function(value, index){
                   return <SpecialTag etf={value} />
                })}

               </div>

          </Card>
          All the high level information you need to know to get you on your way!


          <Collapse className="glossary" bordered={false} defaultActiveKey={['1']}>
            <Panel header="ISF LN " key="1">
              <p>ISF is an ETF (see ETF Below) which tracks the FTSE 100, i.e. the biggest UK based companies. The fund 
              invests in equity (UK stocks), hence the reason it can move quite a lot in a single day. The fund itself is 
              managed by blackrock and has a pretty cheap TER of 7bp</p>
            </Panel>
            <Panel header="SLXX LN" key="2">
              
            </Panel>
            <Panel header="ERNS LN" key="3">
              
            </Panel>
          </Collapse>

            <h4> </h4>

          </Drawer> 
      
      </>
    )

  }
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio,
    glossaryvisible: state.portfolioReducer.showGlossary
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
