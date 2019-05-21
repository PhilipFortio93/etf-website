import React from 'react';

import {
  Tag, Card, Row, Col, Slider, InputNumber, Button, message
} from 'antd';
import "antd/dist/antd.css";
import InfoTag from './InfoTag';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
import SpecialTag from './SpecialTag'

class PortfolioSlider extends React.Component {

  constructor(){
    super();
    this.state={
       etf:{},
       weight:0,
       totalweight:0,
    }
    this.deleteETF = this.deleteETF.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.etf !== this.props.etf) {
      this.setState({etf: newProps.etf});
    }
    this.setState({
      totalweight:this.props.portfolioredux.totalweight,
    })
  }

  componentDidMount(){
    this.setState({
      etf:this.props.etf, 
      weight:this.props.etf['weight'],
      totalweight:this.props.portfolioredux.totalweight,
    })

  }
  deleteETF(){
    console.log("Delete me")
    this.props.deleteItem(this.props.etf['description'])
  }

  handleChange = (value) => {
      if (Number.isNaN(value)) {
        return;
      }
      let dif = value - this.state.weight;

      
      if((this.props.portfolioredux.totalweight+dif) < 1.01 ){
        this.props.updateWeight(this.props.etf['id'], value)
        this.setState({weight:value, totalweight:this.props.portfolioredux.totalweight+dif})
      }
      else{
        message.error("You can't have more than 100% in a portfolio!");
      }
      console.log('Total weight: ',this.props.portfolioredux.totalweight)
      // console.log('totalweight is :',totalweight);
      // // this.setState({
      // //   portfolioweights:{ISFweight:value, SLXXweight:this.state.portfolioweights.SLXXweight}
      // // });
    }

  render(){
    // console.log(this.props.etf)
    let etf = this.props.etf['description'];
    let weight = parseFloat(this.state.weight);
    // console.log('weight of ', weight)
    let total = this.state.totalweight;
    let max = 1-total+weight;
    // console.log('max of ', max)
    
    let name = this.props.etf['description']["Bloomberg Ticker"].substr(0,4);

    return(
                 

                    <Row style={{padding:""}}>
                    
                       <Col span={4}>
                   
                       {/*}
                        <p style={{'vertical-align': 'bottom'}} className='clickablelabel' onClick={this.infoclick}>
                          <Icon type="info-circle" style={{color:'blue'}}  /> 
                        */}
                        <p>
                          <SpecialTag etf={etf} />
                        </p>
                    
                       </Col>

                        <Col span={10} offset={1}>
                          <Slider
                            min={0}
                            max={1}
                            onChange={this.handleChange}
                            value={typeof weight === 'number' ? weight : 0}
                            step={0.01}
                          />
                        </Col>

                        <Col span={4} offset={1}>
                          <InputNumber
                            min={0}
                            max={1}
                            step={0.01}
                            value={typeof weight === 'number' ? weight : 0}
                            onChange={this.handleChange}
                          />
                        </Col>

                        <Col span={3} offset={1}>
                          <Button type="primary" onClick={this.deleteETF}> X </Button>
                        </Col>
                  </Row>
                 
    )

  }
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  updateWeight: (id, weight) => dispatch(portfolioActions.updateWeight(id,weight))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioSlider);
