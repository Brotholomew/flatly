import {Flat} from "common/types/Flat";

export interface Booking {
    id: string,
    renter: Renter,
    checkInDate: string,
    checkOutDate: string
    flat: Flat
}

export interface Renter {
    name: string,
    email: string,
    phoneNumber: string
}