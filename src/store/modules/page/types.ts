export type CHANGE_PAGE_TYPE = 'change-page';
export type SUPPORTED_PAGES = 'flats' | 'bookings';

export const CHANGE_PAGE: CHANGE_PAGE_TYPE = 'change-page';
export const DEFAULT_PAGE: SUPPORTED_PAGES = "flats";

export interface PageAction {
    payload: SUPPORTED_PAGES,
    type: CHANGE_PAGE_TYPE;
}