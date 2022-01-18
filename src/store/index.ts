import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import authReducers from "store/modules/auth/reducers";
import paginationReducers from "./modules/pagination/reducers";
import styleReducers from "./modules/styles/reducers";
import pageReducers from "./modules/page/reducers";

const rootReducers = combineReducers({
    authReducers,
    paginationReducers,
    styleReducers,
    pageReducers
});

const store = createStore(
    rootReducers,
    composeWithDevTools()
);

export default store;