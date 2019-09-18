import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

class CountryBreakdown extends Component {

    constructor(){
    super();
    this.state={
      holdings:[],
      pielables:[],
      sectorweights:[],
      piecolors:[]
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.holdings.length !== this.props.holdings.length) {

    let holdings = newProps.holdings;
    let count = newProps.etfcount;

    var sector = groupBy(holdings, function(obj) {
      return obj["country"];
    });

    var pielables = [];
    var sectorweights = [];
    var piecolors = [];

    for (var key in sector){
      pielables.push(key);
      sectorweights.push(sector[key].reduce((prev,next) => prev + parseFloat(next.weight)/parseFloat(count),0))
      piecolors.push(getRandomColor());
    }

    this.setState({
      holdings:newProps.holdings, 
      pielables:pielables,
      sectorweights:sectorweights,
      piecolors:piecolors
    })
    
    }
  }

  componentDidMount(){
    let holdings = this.props.holdings;
    let count = this.props.etfcount;

    var sector = groupBy(holdings, function(obj) {
      return obj["country"];
    });

    var pielables = [];
    var sectorweights = [];
    var piecolors = [];

    for (var key in sector){
      pielables.push(key);
      sectorweights.push(sector[key].reduce((prev,next) => prev + parseFloat(next.weight)/parseFloat(count),0))
      piecolors.push(getRandomColor());
    }

    this.setState({
      holdings:this.props.holdings, 
      pielables:pielables,
      sectorweights:sectorweights,
      piecolors:piecolors
    })

  }


  render() {

    let holdings = this.props.holdings;
    let sectorweights = this.state.sectorweights;
    let pielables = this.state.pielables;
    let piecolors = this.state.piecolors;


    let pieoptions = 
  //   screenWidth < 500 ? {
  //   responsive:true,
  //   maintainAspectRatio: true,
  //   legend:{
  //     display: true,
  //     labels:{
  //       fontSize:10,
  //       padding:4,
  //       boxWidth: 10,
  //     }
  //   }
  // } : 
  {
    responsive:true,
    maintainAspectRatio: true,
    legend:{
      display: true,
      labels:{
        fontSize:10,
        padding:4,
        boxWidth: 10,
      }
    }
  }


    console.log(sectorweights)
    let piechartdata = {
        labels: pielables,
        datasets: [{
            data: sectorweights,
            backgroundColor: piecolors
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        
    };

    return (
      <div>
        <p> Country Breakdown Component </p>
        <Doughnut data={piechartdata} options={pieoptions} />
      </div>
    );
  }
}

export default CountryBreakdown;
