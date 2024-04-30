import auth from "./auth/reducer";
import navigation from "./navigation/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    navigation,
    router: routerReducer,
    ...asyncReducers,
  });

export default createReducer;
