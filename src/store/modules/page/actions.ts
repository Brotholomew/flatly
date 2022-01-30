import {CHANGE_PAGE, PageAction, SUPPORTED_PAGES} from "./types";

export const setPage = (page: SUPPORTED_PAGES): PageAction => {
    return {
        payload: page,
        type: CHANGE_PAGE
    }
}