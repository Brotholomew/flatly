import generateID from "../helpers/generateID";
import {Flat, EmptyFlat} from "common/types/Flat";

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

export const EmptyRenter: Renter = {
    name: '',
    email: '',
    phoneNumber: ''
}

export const EmptyBooking: Booking = {
    id: generateID(),
    renter: EmptyRenter,
    checkInDate: '',
    checkOutDate: '',
    flat: EmptyFlat
}