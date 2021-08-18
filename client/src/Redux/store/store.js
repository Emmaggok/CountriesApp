import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/reducers";
import thunk from "redux-thunk";

/* const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk));
export default store; */


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;