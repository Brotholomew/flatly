import {Flat} from "common/types/Flat";

export interface Booking {
    id: string,
    userData: string,
    checkInDate: string,
    checkOutDate: string,
    flat: Flat,
}

export interface Renter {
    name: string,
    email: string,
    phoneNumber: string
}