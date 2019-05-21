import * as types from './actionsTypes';

const showGlossary = (showglossary) => ({
  type: types.SHOW_GLOSSARY,
  payload: showglossary
});

const globalLoading = (loading) => ({
  type: types.LOADING,
  payload: loading
});

const createItem = (etf) => ({
  type: types.PORTFOLIO_ADD,
  payload: etf
});

const deleteItem = id => ({
  type: types.PORTFOLIO_DELETE,
  payload: id
});

const updateWeight = (id, weight) => ({
  type: types.PORTFOLIO_UPDATE,
  payload: id, weight
});

const loadalloverview = (data) => ({
  type: types.ALL_LOAD,
  payload: data
});

export default {
  createItem,
  deleteItem,
  updateWeight,
  globalLoading,
  loadalloverview,
  showGlossary
};