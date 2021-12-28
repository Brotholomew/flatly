import { FLATS_CURRENT_PAGE, FLATS_MAX_PAGE } from "./types";
import { paginationAction, initialPaginationState } from "./types";

const paginationReducers = (state = initialPaginationState, action: paginationAction) => {
    switch(action.type) {
        case FLATS_CURRENT_PAGE:
            return{
                ...state,
                currentPageFlats: action.payload.page
            };
        case FLATS_MAX_PAGE:
            return {
                ...state,
                maxPageFlats: action.payload.page
            };
        default:
            return state;
    }
}

export default paginationReducers;