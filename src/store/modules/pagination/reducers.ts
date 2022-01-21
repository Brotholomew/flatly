import {BOOKINGS_CURRENT_PAGE, BOOKINGS_MAX_PAGE, FLATS_CURRENT_PAGE, FLATS_MAX_PAGE} from "./types";
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
        case BOOKINGS_CURRENT_PAGE:
            return {
                ...state,
                currentPageBookings: action.payload.page
            };
        case BOOKINGS_MAX_PAGE:
            return {
                ...state,
                maxPageBookings: action.payload.page
            }
        default:
            return state;
    }
}

export default paginationReducers;