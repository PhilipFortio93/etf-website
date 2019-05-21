import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
  Col, Tooltip, 
} from 'antd';
import "antd/dist/antd.css";
import "../toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';
import {standardDeviation} from './mathsfunctions';

class StatsComponent extends React.Component {


	constructor(props) {
	    super(props);
	    this.state = {
	    	portfolioweights:this.props.weights,
	    	notional:this.props.notional,
	    	portfolioTR:this.props.portfolioTR,
	    	portfolioDR:this.props.portfolioDR,
	    }
  	}


	componentWillReceiveProps(newProps) {
	  if(newProps.notional !== this.props.notional) {
	    this.setState({notional: newProps.notional});
	  }
	 if(newProps.weights !== this.props.portfolioweights) {
	    this.setState({portfolioweights: newProps.weights});
	  }
	 if(newProps.portfolioTR !== this.props.portfolioTR) {
	    this.setState({portfolioTR: newProps.portfolioTR});
	  }
	  if(newProps.portfolioDR !== this.props.portfolioDR) {
	    this.setState({portfolioDR: newProps.portfolioDR});
	  }
	}

  render() {
  	let notional = this.state.notional;
  	let portfolioweights = this.state.portfolioweights;
  	let slxxweight = portfolioweights.SLXXweight;
    let isfweight = portfolioweights.ISFweight;
    let portfolioTR = this.state.portfolioTR;
    let portfolioDR = this.state.portfolioDR;

    
    let ISFTR = portfolioTR.ISFTR;
    let SLXXTR = portfolioTR.SLXXTR;
    let ERNSTR = portfolioTR.ERNSTR;
    let WeightedCum = portfolioTR.WeightedCum;
    
    let ISFdaily = portfolioDR.ISFdaily;
    let SLXXdaily = portfolioDR.SLXXdaily;
    let ERNSdaily = portfolioDR.ERNSdaily;
    let dailyweighted = portfolioDR.dailyweighted;

    let precision = isNaN(notional) ? 5 : notional.toString().length - 1;


    let minISF = Math.min(...ISFTR);
    let minSLXX = Math.min(...SLXXTR);
    let minERNS = Math.min(...ERNSTR);
    let minWeighted = Math.min(...WeightedCum);

    let portfolioSD = standardDeviation(dailyweighted);
    let ISFSD = standardDeviation(ISFdaily);
    let SLXXSD = standardDeviation(SLXXdaily);
    let ERNSSD = standardDeviation(ERNSdaily);

    return (

                <Col style={{'vertical-align':'top', paddingBottom:'0px'}}>
                <div>

                </div>

                    <table  class="table table-fixed" className="statstable" style={{width:'100%'}} >
                      <thead>
                        <tr>
                          <th class="col-xs-2">Product</th>
                          <th class="col-xs-2">ISF</th>
                          <th class="col-xs-2">SLXX</th>
                          <th class="col-xs-2">ERNS</th>
                          <th class="col-xs-2">Portfolio</th>

                        </tr>
                      </thead>

                      
                      <tbody>
                         <tr className="tutorialweighting">
                          <th class="col-xs-2">Weighting</th>
                          <th class="col-xs-2">{(isfweight*100).toString().substring(0,4)+"%"}</th>
                          <th class="col-xs-2">{(slxxweight*100).toString().substring(0,4)+"%"}</th>
                          <th class="col-xs-2">{((1-isfweight-slxxweight)*100).toString().substring(0,4)+"%"}</th>
                          <th class="col-xs-2">100%</th>

                        </tr>
                        
                         <tr className="tutorialcash">
                          <th class="col-xs-2">Investment</th>
                          <th class="col-xs-2">{(isfweight*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2">{(slxxweight*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2">{((1-isfweight-slxxweight)*notional).toString().substring(0,notional.toString().length-1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2">{notional.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                        </tr>
                        
                        <tr className="tutorialreturn">
                          <th class="col-xs-2">Return</th>
                          <th class="col-xs-2" style={{color: ISFTR[ISFTR.length-1] < 0 ? "red" : ""}}>{String(ISFTR[ISFTR.length-1]).substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: SLXXTR[SLXXTR.length-1] < 0 ? "red" : ""}}>{String(SLXXTR[SLXXTR.length-1]).substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: ERNSTR[ERNSTR.length-1] < 0 ? "red" : ""}}>{String(ERNSTR[ERNSTR.length-1]).substring(0,5)+"%"}</th>
                          <th class="col-xs-2" style={{color: WeightedCum[WeightedCum.length-1] < 0 ? "red" : ""}}>{String(WeightedCum[WeightedCum.length-1]).substring(0,5)+"%"}</th>

                        </tr>

                        <tr className="tutorialreturncash">
                          <th class="col-xs-2">Cash Return</th>
                          <th class="col-xs-2" style={{color: ISFTR[ISFTR.length-1] < 0 ? "red" : ""}} >{String((ISFTR[ISFTR.length-1]/100+1)*notional*isfweight).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: SLXXTR[SLXXTR.length-1] < 0 ? "red" : ""}} >{String((SLXXTR[SLXXTR.length-1]/100+1)*notional*slxxweight).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: ERNSTR[ERNSTR.length-1] < 0 ? "red" : ""}} >{String((ERNSTR[ERNSTR.length-1]/100+1)*notional*(1-isfweight-slxxweight)).substring(0,precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>
                          <th class="col-xs-2" style={{color: WeightedCum[WeightedCum.length-1] < 0 ? "red" : ""}} >{String((WeightedCum[WeightedCum.length-1]/100+1)*notional).substring(0,precision+1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</th>

                        </tr>
                        
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
						

                       </tbody>
                      </table>

                 </Col>
    )
  }

}

export default StatsComponent;