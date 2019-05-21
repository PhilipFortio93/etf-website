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

class SectorBreakdown extends Component {

    constructor(){
    super();
    this.state={
      holdings:{}
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.holdings !== this.props.holdings) {
      this.setState({holdings: newProps.holdings});
    }
  }

  componentDidMount(){
    this.setState({
      holdings:this.props.holdings, 
    })

  }



  render() {



    let holdings = this.props.holdings;
    let tableholdings = [];

    if(holdings){ //only process if there is data
      if (holdings.length > 0){
        tableholdings = holdings.slice(1);
      }
    }

    var sector = groupBy(holdings, function(obj) {
      return obj["sector"];
    });

    var pielables = [];
    var sectorweights = [];
    var piecolors = [];

    for (var key in sector){
      pielables.push(key);
      sectorweights.push(sector[key].reduce((prev,next) => prev + parseFloat(next.weight),0))
      piecolors.push(getRandomColor());
    }


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
        <p> Sector Breakdown Componenet </p>
        <Doughnut data={piechartdata} options={pieoptions} />
      </div>
    );
  }
}

export default SectorBreakdown;
