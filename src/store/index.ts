import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import authReducers from "store/modules/auth/reducers";
import paginationReducers from "./modules/pagination/reducers";

const rootReducers = combineReducers({
    authReducers,
    paginationReducers
});

const store = createStore(
    rootReducers,
    composeWithDevTools()
);

export default store;