import React from 'react';

import {
  Tag, Card, Modal
} from 'antd';
import "antd/dist/antd.css";

// import { Link } from "react-router-dom";
const confirm = Modal.confirm;

const messages = {
  "Base Currency":"The currency you will have to provide to buy this ETF",
  "Asset Class":"The primary type of assets the fund invests in",
  "Administrator": "The company that calculates the value of the fund as well as other operational services",
  "Benchmark Index": "The index the ETF aims to track",
  "Bloomberg Ticker": "A unique identifier to the ETF and exchange on which it trades",
  "Distribution Frequency": "How often the fund expects to distribute income (like a dividend or coupon)",
  "Distribution Yield": "The yield of the income in %",
  "Domicile": "Where the fund is incorporated",
  "ISIN": "A global unique identifier",
  "Manager":"The Company that sponsors and manages the fund",
  "Inception Date": "The day the ETF was launched",
  "Net Assets": "The size of the fund",
  "Number of Holdings": "Number of assets in the fund",
  "Product Structure": "Does the fund replicate the index by buying physical assets or buy buying a derivative from an investment bank?",
  "Securities Lending Return": "Extra return the fund has earned by lending its assets to others",
  "Shares Outstanding": "The number of shares that have been issued",
  "Total Expense Ratio": "The fee charged specifically by the fund manager? (note this is not the only cost)",
  "UCITS Compliant": "Does the fund follow UCITS rules set out by the EU?",
  "Use of Income": "Does the fund distribute any income it receives to the holders or reinvest it within the fund?",

}
export default class InfoTag extends React.Component {

  constructor(){
    super();
    this.state={
       datavalue:'',
       infotype:'',
    }
    this.info = this.info.bind(this);
  }

  info() {
    let infotype = this.state.infotype;
    let datavalue = this.state.datavalue;
    let infomessage = messages[infotype]
    if(!infomessage){
      infomessage="No Description Found!";
      infotype="Error";
    }
    Modal.info({
      title: infotype,
      content: (
        <div>
          <p>{infomessage}</p>
          <Tag color="magenta">{datavalue}</Tag>
        </div>
      ),
      onOk() {},
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.datavalue !== this.props.datavalue) {
      this.setState({datavalue: newProps.datavalue});
    }
    if(newProps.infotype !== this.props.infotype) {
      this.setState({infotype: newProps.infotype});
    }
  }

  componentDidMount(){
    this.setState({datavalue:this.props.datavalue})
    this.setState({infotype:this.props.infotype})
  }

  render(){

    let datavalue = this.state.datavalue;
    let infotype = this.state.infotype;
    // console.log(infotype);
    return(
      <>
            <Tag color="magenta" onClick={this.info}>{datavalue}</Tag>
      </>
    )

  }
}