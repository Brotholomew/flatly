import generateID from "../helpers/generateID";

export interface Flat {
    id: string,
    name: string,
    address: FlatAddress,
    rooms?: number,
    area?: number,
    facilities: string[],
    images: string[],
    description: string
}

export interface FlatAddress {
    streetName: string,
    houseNumber: string,
    flatNumber?: string,
    postalCode: string,
    city: string
}

export const EmptyFlatAddress: FlatAddress = {
    streetName: '',
    houseNumber: '',
    flatNumber: undefined,
    postalCode: '',
    city: ''
}

export const EmptyFlat: Flat = {
    id: generateID(),
    name: '',
    address: EmptyFlatAddress,
    rooms: undefined,
    area: undefined,
    facilities: [],
    images: [],
    description: ''
}

