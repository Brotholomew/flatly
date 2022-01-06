// const definitions
export const FLATS_CURRENT_PAGE = 'FLATS_CURRENT_PAGE'
export const FLATS_MAX_PAGE = 'FLATS_MAX_PAGE'
// -- * --

// interfaces to get or set pagination action
export interface paginationInterface {
    page: number
}

export interface paginationAction {
    payload: paginationInterface,
    type: string
}
// -- * --

export interface paginationStateInterface {
    currentPageFlats: number,
    maxPageFlats: number
}

export const initialPaginationState:paginationStateInterface = {
    currentPageFlats: 0,
    maxPageFlats: 0
}