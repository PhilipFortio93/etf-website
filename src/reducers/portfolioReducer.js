import * as types from '../actions/actionsTypes';
import _ from "lodash";

const defaultState ={
	totalweight: 1,
	loading: false,
	portfolio: [],
	alldata: [],
	showGlossary: false,
  user: null,
};

const portfolioReducer = (state = defaultState, action) => {
  switch (action.type) {

    case types.LOGIN: {
        let newState = _.cloneDeep(state);
      newState.user = action.payload;
      console.log(action)
      return newState  
    }

    case types.LOGOUT: {
        let newState = _.cloneDeep(state);
      newState.user = null;
      return newState  
    }

  	case types.SHOW_GLOSSARY: {
  	  	let newState = _.cloneDeep(state);
  		newState.showGlossary = action.payload;
  		return newState	
  	}

  	case types.ALL_LOAD: {
  	  	let newState = _.cloneDeep(state);
  		newState.alldata = action.payload;
  		return newState	
  	}

  	case types.LOADING: {
  		let newState = _.cloneDeep(state);
  		newState.loading = action.payload;
  		return newState
  	}

    case types.PORTFOLIO_ADD: {
      // console.log(action);
      let etf = action.payload;
      let newItem = {};
      if(state.portfolio.length<1){
     	newItem = { id: state.portfolio.length + 1, weight: 1, description: etf.description, data:etf.data, divs:etf.divs};
      }
      else{
      	newItem = { id: state.portfolio.length + 1, weight: 0, description: etf.description, data:etf.data, divs:etf.divs};
      }
      let newState = _.cloneDeep(state);
      newState.portfolio.push(newItem);
      return newState;
    }

    case types.PORTFOLIO_DELETE: {
    	// console.log(action);
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.portfolio, { description: action.payload });
      let difference = newState.portfolio[index].weight;
      newState.totalweight = newState.totalweight - difference;
      newState.portfolio.splice(index, 1);
      return newState;
    }

    case types.PORTFOLIO_UPDATE: {
      console.log('action: ',action.weight);
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.portfolio, { id: action.payload });

      // console.log(index)
      
      // console.log(state.totalweight)
      
      let difference = newState.portfolio[index].weight-action.weight;
      newState.portfolio[index].weight=action.weight;
      newState.totalweight = newState.totalweight - difference;
      return newState;
    }

    default:
      return state;
  }
};

export default portfolioReducer;