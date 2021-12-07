import {combineReducers, createStore} from "redux";
import authReducers from "store/modules/auth/reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducers = combineReducers({
    authReducers
});

const store = createStore(
    rootReducers,
    composeWithDevTools()
);

export default store;