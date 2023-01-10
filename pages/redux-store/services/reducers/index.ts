import { combineReducers } from "redux";

//Importing Functions from reducers.js
import cartReducerFunc from "./cart-reducers";

export default combineReducers({
  combinedReducerResult: cartReducerFunc,
});
