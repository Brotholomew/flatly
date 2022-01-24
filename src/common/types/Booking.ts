import {Flat} from "common/types/Flat";

export interface Booking {
    id: string,
    userData: string,
    startDateTime: string,
    active: boolean,
    flat: Flat,
}

export interface Renter {
    name: string,
    email: string,
    phoneNumber: string
}