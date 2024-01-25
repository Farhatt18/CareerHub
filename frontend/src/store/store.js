import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import session from "./reducers/session";
import posts from "./reducers/post";
import modals from "./reducers/modals";
import comments from "./reducers/comment";
import users from "./reducers/users";
import experiences from "./reducers/experience";

const rootReducer = combineReducers({
  session,
  posts,
  modals,
  comments,
  users,
  experiences,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
