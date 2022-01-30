import {CHANGE_PAGE, DEFAULT_PAGE, PageAction, SUPPORTED_PAGES} from "./types";

const pageReducers = (state: SUPPORTED_PAGES = DEFAULT_PAGE, action: PageAction) => {
    switch(action.type) {
        case CHANGE_PAGE:
            return action.payload;
        default:
            return state;
    }
}

export default pageReducers;