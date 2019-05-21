import React, { Component } from 'react';
import {
  Carousel, Col
} from 'antd';
import Slider from "react-slick";
import {Line} from 'react-chartjs-2';
import PortfolioSlider from './PortfolioSlider';
import PortfolioStatsComponent from './portfolio_stats_comp';
import SectorBreakdown from './SectorBreakdown';
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
    console.log('dataanalysis: ',dataanalysis)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return(

        <Slider settings={settings}>


          <div>
            <p>Construct your Portfolio above!</p>
            <Line data={graphalldata} options={options} />
          </div>
          <div>
            <p>Check the Stats</p>
            <PortfolioStatsComponent data={dataanalysis} />
          
          </div>

           <div>
            <p>See what it might cost to invest</p>
          </div>

          <div>
            <p>See how your risk breaks down</p>  
            {/*
             <SectorBreakdown />  
            */}

          </div>

           <div>
            <p>Any income?</p>    
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
