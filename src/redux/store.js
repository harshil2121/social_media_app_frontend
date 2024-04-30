// import { createStore, applyMiddleware, compose } from "redux";
// import { routerMiddleware } from "react-router-redux";
// import { createBrowserHistory } from "history";
// import { thunk } from "redux-thunk";
// import createReducer from "./reducers";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: [
//     // "scrumboard",
//     // "themeSetting",
//     "LanguageSwitcher",
//     // "themeChanger",
//     "navigation",
//   ],
// };
// const history = createBrowserHistory();
// const routeMiddleware = routerMiddleware(history);
// const middlewares = [thunk, routeMiddleware];
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedReducer = persistReducer(persistConfig, createReducer());
// const store = createStore(
//   persistedReducer,
//   composeEnhancer(applyMiddleware(...middlewares))
// );
// const persistor = persistStore(store);

// export { store, history, persistor };

import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory, useNavigate } from "react-router-dom"; // Import useNavigate
import { thunk } from "redux-thunk";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    // "scrumboard",
    // "themeSetting",
    "LanguageSwitcher",
    // "themeChanger",
    "navigation",
  ],
};
const routeMiddleware = (store) => (next) => (action) => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    const location = action.payload.location;
    store.dispatch({ type: "NAVIGATE", payload: { path: location.pathname } });
  }
  return next(action);
};

const middlewares = [thunk, routeMiddleware]; // Remove routerMiddleware
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createReducer());
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };
