import {CHANGE_THEME, DEFAULT_THEME, StyleAction, SUPPORTED_THEMES} from "./types";

const styleReducers = (state: SUPPORTED_THEMES = DEFAULT_THEME, action: StyleAction) => {
    switch(action.type) {
        case CHANGE_THEME:
            return action.payload;
        default:
            return state;
    }
}

export default styleReducers;