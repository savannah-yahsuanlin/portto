import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const assets = (state = [], action) => {
  if (action.type === "SET_ASSETS") {
    return action.assets;
  }
  return state;
};


const setAssets = (assets) => {
  return {
    type: "SET_ASSETS",
    assets,
  };
};


export const fetchAssets = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/assets");
    dispatch(setAssets(data));
  };
};


const reducer = combineReducers({
  assets
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;