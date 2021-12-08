export interface Flat {
    id: string,
    name: string,
    address: FlatAddress,
    rooms: number,
    area: number,
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