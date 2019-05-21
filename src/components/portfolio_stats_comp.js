import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
  Col, Tooltip, 
} from 'antd';
import "antd/dist/antd.css";
import "../toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';
import {standardDeviation} from './mathsfunctions';

function niceFormat(value){
  let precision = value.toString().indexOf(".")+3;
  if (precision == 2){
    precision = value.toString().length;
  }
  return value.toString().substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export class PortfolioStatsComponent extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
      }
    }


  componentWillReceiveProps(newProps) {
    if(newProps.data !== this.props.data) {
      this.setState({data: newProps.data});
    }
  }

  render() {
    let data = this.props.data;

    let dailyreturn_withdivs = [];
    let cumulativereturn_withdivs = [];
    let cumulativecashreturn_withdivs = [];
    let portfolioreturn = {};
    if(data.length >0){
      for (var i = 0; i < data.length;i++){
        if(data[i].name=='Portfolio'){ // for some reason the portfolio field gets added before this finishes!!! 
          data.splice(i,1)
        }
      }

     // console.log('data is ',data)
     // console.log('special ', data[0].weighteddailyreturn_withdivs[1117])
      for (var i = 0; i < data[0].totalweighteddailycashwithdivs.length; i++){  
        // console.log(i)
        let weighteddailyreturn = 0;
        let weightedcumulativereturn = 0;
        let weightedcumulativecash=0;
        for (var k = 0; k < data.length; k++){ 
          // console.log(k)
          if(data[k].weighteddailyreturn_withdivs[i]){

            // dailyportfolio = dailyportfolio;
            weighteddailyreturn = weighteddailyreturn + data[k].weighteddailyreturn_withdivs[i];
            weightedcumulativereturn = weightedcumulativereturn + data[k].cumulativeweightedreturn_withdivs[i];
            // console.log(i)
            // console.log('cash :',data[k].totalweighteddailycashwithdivs[i])
            weightedcumulativecash = weightedcumulativecash + data[k].totalweighteddailycashwithdivs[i];
          }
        }
        dailyreturn_withdivs.push(weighteddailyreturn);
        cumulativereturn_withdivs.push(weightedcumulativereturn)
        cumulativecashreturn_withdivs.push(weightedcumulativecash)
      }
      // console.log('cumulative cash: ',cumulativecashreturn_withdivs)
      // console.log('data length is ',data[0].weighteddailyreturn_withdivs.length)
      portfolioreturn = {
        "name":"Portfolio",
        "weight":1,
        "dailyreturn_withdivs":dailyreturn_withdivs,
        "cumulativereturn_withdivs":cumulativereturn_withdivs,
        "totalweighteddailycashwithdivs":cumulativecashreturn_withdivs,
      }
      data.push(portfolioreturn)

    }

    let sd = [];
    let min =[];
    if(data.length >0){
      for (var i = 0; i < data.length; i++){
        // console.log(data[i].cumulativereturn_withdivs);
        sd.push(standardDeviation(data[i].dailyreturn_withdivs));
        min.push(Math.min(...data[i].cumulativereturn_withdivs));

        }

      }

    return (

                <Col style={{'vertical-align':'top', paddingBottom:'0px'}}>
                <div>

                </div>

                    <table  class="table table-fixed" className="statstable" style={{width:'100%'}} >
                      <thead>
                        <tr>
                          <th class="col-xs-2">Product</th>

                          {data.map(function(value, index){
                             return <th class="col-xs-2">{value.name}</th>
                          })}

                        </tr>
                      </thead>
                      
                      <tbody>
                         <tr className="tutorialweighting">

                          <th class="col-xs-2">Weighting</th>

                              {data.map(function(value, index){
                             return <th class="col-xs-2">{(parseFloat(value.weight)*100).toString().substring(0,5)+"%"}</th>
                          })}

                        </tr>

                        
                        <tr className="tutorialcash">

                          <th class="col-xs-2">Investment</th>

                              {data.map(function(value, index){
                             return <th class="col-xs-2">{niceFormat(value.totalweighteddailycashwithdivs[value.totalweighteddailycashwithdivs.length-1])}</th>
                          })}


                        </tr>
                        
                        <tr className="tutorialreturn">

                          <th class="col-xs-2">Return</th>

                              {data.map(function(value, index){
                             return <th class="col-xs-2">{(parseFloat(value.cumulativereturn_withdivs[0])).toString().substring(0,5)+"%"}</th>
                          })}

                        </tr>

                        
                        <tr className="tutorialreturncash">

                          <th class="col-xs-2">Cash Return</th>

                              {data.map(function(value, index){
                             return <th class="col-xs-2">{niceFormat(value.totalweighteddailycashwithdivs[0])}</th>
                          })}

                  

                        </tr>
                          

                        <tr className="tutorialSD">

                          <th class="col-xs-2">Standard Deviation</th>

                              {sd.map(function(value, index){
                             return <th class="col-xs-2">{(parseFloat(value)).toString().substring(0,5)+"%"}</th>
                          })}


                        </tr>

                        <tr className="tutorialreturncash">

                          <th class="col-xs-2">Largest Draw Down</th>

                              {min.map(function(value, index){
                             return <th class="col-xs-2">{(parseFloat(value)).toString().substring(0,5)+"%"}</th>
                          })}

                        </tr>

                         {/*}
                        

                        
                        <Tooltip title="A higher standard deviation means historically that asset goes up or down a lot in value in a short period of time relative to other things">
                        <tr className="tutorialSD">
                          <th class="col-xs-2">Standard Deviation</th>
                           
                          <th class="col-xs-2">{ISFSD.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2">{SLXXSD.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2">{ERNSSD.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2">{portfolioSD.toString().substring(0,5)+"%"}</th>

                        </tr>
                        </Tooltip>
                        <tr className="drawdown">
                          <th class="col-xs-2">Largest Draw Down</th>
                          <th class="col-xs-2" style={{color: minISF < 0 ? "red" : ""}}>{minISF.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: minSLXX < 0 ? "red" : ""}}>{minSLXX.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: minERNS < 0 ? "red" : ""}}>{minERNS.toString().substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: minWeighted < 0 ? "red" : ""}}>{minWeighted.toString().substring(0,5)+"%"}</th>

                        </tr>
                        <tr className="drawdown">
                          <th class="col-xs-2">Draw Down in Cash</th>
                          <th class="col-xs-2" style={{color: minISF < 0 ? "red" : ""}}>{(isfweight*minISF*notional/100).toString().substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: minSLXX < 0 ? "red" : ""}}>{(slxxweight*minSLXX*notional/100).toString().substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: minERNS < 0 ? "red" : ""}}>{((1-isfweight-slxxweight)*minERNS*notional/100).toString().substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: minWeighted < 0 ? "red" : ""}}>{(minWeighted*notional/100).toString().substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                        </tr>
            
                        */}
                       </tbody>
                     
                      </table>

                 </Col>
    )
  }

}

export default PortfolioStatsComponent

