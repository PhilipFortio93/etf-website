import React from 'react';

import {
  Tag, Card
} from 'antd';
import "antd/dist/antd.css";
import InfoTag from './InfoTag';

import { Link } from "react-router-dom";

export default class BasicOverview extends React.Component {

  constructor(){
    super();
    this.state={
       etf:{},
       loading:false,
    }
    
  }

  componentWillReceiveProps(newProps) {
    if(newProps.etf !== this.props.etf) {
      this.setState({etf: newProps.etf});
    }
  }

  componentDidMount(){
    this.setState({etf:this.props.etf})

  }

  render(){
    let overviewdata = this.state.etf;
    console.log(overviewdata);
    let basecurrency = overviewdata['Base Currency'];
    let manager = overviewdata['Manager'];
    let index = overviewdata['Benchmark Index'];
    let assetclass = overviewdata['Asset Class'];
    let productstructure = overviewdata['Product Structure'];
    let expenseratio = overviewdata['Total Expense Ratio'];
    let longname = overviewdata['Long Name'];
    let description = overviewdata['Description'];
    let income = overviewdata['Use of Income'];
    let assets = overviewdata['Net Assets'];
    let yieldval = overviewdata['Distribution Yield'];
    let yieldcomp = ''
    if(income=='Distributing'){
      yieldcomp = <InfoTag datavalue={'Yield:'+yieldval+'%'} infotype={"Distribution Yield"} /> ;
    }

    return(
                 <Card style={{padding:"1%", marginTop:"2%"}}>

                   <h5 style={{ marginBottom: 8 }}>Basic Overview: {longname}</h5>
                   <span >{description}</span>
                     <div style={{ marginTop: 8 }}>
                       <InfoTag datavalue={basecurrency} infotype={"Base Currency"} />
                       <InfoTag datavalue={manager} infotype={"Manager"} />
                       <InfoTag datavalue={index} infotype={"Benchmark Index"} />
                       <InfoTag datavalue={assetclass} infotype={"Asset Class"} />
                       <InfoTag datavalue={income} infotype={"Use of Income"} />
                       <InfoTag datavalue={assets} infotype={"Net Assets"} />
                       {yieldcomp}
                       <InfoTag datavalue={productstructure} infotype={"Product Structure"} />
                       <InfoTag datavalue={'Fee: '+expenseratio+'%'} infotype={"Total Expense Ratio"} />
                     </div>
                 </Card>
    )

  }
}