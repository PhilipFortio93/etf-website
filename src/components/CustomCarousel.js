import React, { Component } from 'react';
import {
  Carousel, Col
} from 'antd';
import Slider from "react-slick";
import {Line} from 'react-chartjs-2';
import PortfolioSlider from './PortfolioSlider';
import PortfolioStatsComponent from './portfolio_stats_comp';
import SectorBreakdown from './SectorBreakdown';
import CountryBreakdown from './CountryBreakdown';
import "antd/dist/antd.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
import _ from "lodash";
import "slick-carousel/slick/slick.css"; 

// import "slick-carousel/slick/slick-theme.css";




  function onChange(a, b, c) {
    console.log(a, b, c);
  }

class CustomCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // dataanalysis:[],
      // graphalldata: [],
      // options:{},
    };
    // this.next = this.next.bind(this);
    // this.previous = this.previous.bind(this);
    // this.goToIndex = this.goToIndex.bind(this);
    // this.onExiting = this.onExiting.bind(this);
    // this.onExited = this.onExited.bind(this);
  }
  componentWillReceiveProps(newProps){

    // if(newProps !== this.props) {
    //   this.setState({
    //     graphalldata: newProps.graphalldata,
    //     options:newProps.options,
    //     dataanalysis:newProps.dataanalysis
    //   });
    // }
    //  if(newProps.options !== this.props.options) {
    //   this.setState({options:newProps.options});
    // }
    //      if(newProps.dataanalysis !== this.props.dataanalysis) {
    //   this.setState({dataanalysis:newProps.dataanalysis});
    // }
  }
  componentDidMount(){
    //add props to new component
  }

  render() {
    let graphalldata = this.props.graphalldata;
    let options = this.props.options;
    let dataanalysis = this.props.dataanalysis;
    // let holdingsdata = this.props.holdingsdata;
    console.log('dataanalysis: ',dataanalysis)
    const settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      slidesToShow: 2,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let holdingsdata = [];
    let SectorComp = <p> Add to your portfolio to see the sector breakdown </p>;
    let CountryComp = <p> Add to your portfolio to see the sector breakdown </p>;
    let holdings = []
    if(this.props.portfolioredux.length > 0){

       holdings = this.props.portfolioredux.map(function(value){
       // console.log(value.holdings)
       return value.holdings
        })

      console.log("numer of etfs: ", this.props.portfolioredux.length);
      console.log("holdings data: ", holdings)

      for(let k=0; k < this.props.portfolioredux.length; k++){
        holdingsdata = holdingsdata.concat(holdings[k])
      }
    
      console.log('holdingsdata :',holdingsdata);

    }


    if(holdingsdata.length >0){
      SectorComp = <SectorBreakdown holdings={holdingsdata} etfcount={this.props.portfolioredux.length}/>;
      CountryComp = <CountryBreakdown holdings={holdingsdata} etfcount={this.props.portfolioredux.length}/>;
    }

    return(

        <Slider settings={settings} style={{padding:"5%"}}>


          <div>
            <p>Construct your Portfolio above!</p>
            <Line data={graphalldata} options={options} />
          </div>
          <div>
            <p>Check the Stats</p>
            <PortfolioStatsComponent data={dataanalysis} />
          
          </div>



          <div>
              {SectorComp}

          </div>
              {CountryComp}
           <div>
            <p>Any income?</p>    
          </div>

                     <div>
            <p>See what it might cost to invest</p>
          </div>

        </Slider>
  )}
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio,
    globalloading:state.portfolioReducer.loading,
    alloverviewdata:state.portfolioReducer.alldata
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  globalLoading: loading => dispatch(portfolioActions.globalLoading(loading)),
  loadalloverview: data => dispatch(portfolioActions.loadalloverview(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomCarousel);
