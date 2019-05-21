import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {Card} from 'antd';
import SpecialTag from './SpecialTag';
// import { generateRows } from '../../../demo-data/generator';

export default class GroupedComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      datareq:this.props.datareq
      // columns: [
      //   { name: 'Bloomberg Ticker', title: 'Name' },
      //   { name: 'Asset Class', title: 'Asset Class' },
      // ],
      // rows: [
      //   { 'Bloomberg Ticker': 'Bloomberg Ticker', 'Asset Class': 'Asset Class' },
      // ],
      // grouping: [{ columnName: 'Asset Class' }],
    };

  }

  componentWillReceiveProps(newProps) {
    if(newProps.datareq !== this.props.datareq) {

      // let data = this.props.datareq.map(function(value){
      //   return { 'Bloomberg Ticker': value['Bloomberg Ticker'], 'Asset Class': value['Asset Class'] }
      // })

      this.setState({
        datareq: newProps.datareq
      })

    }

  }

  componentDidMount(){

  }

  render() {
    let datareq = this.props.datareq;
    console.log(this.props.datareq);
    let rows =[]
    for(var key in datareq){
      let products = datareq[key].map(function(value, index){
         return <SpecialTag etf={value} />
      })
      rows.push(<Card>{key} : {products}</Card>)
    }
    return (
      <Paper>
        {rows}
      </Paper>
    );
  }
}