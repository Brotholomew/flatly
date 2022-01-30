import {CHANGE_THEME, StyleAction, SUPPORTED_THEMES} from "./types";

export const setStyle = (style: SUPPORTED_THEMES): StyleAction => {
    return {
        payload: style,
        type: CHANGE_THEME
    }
}