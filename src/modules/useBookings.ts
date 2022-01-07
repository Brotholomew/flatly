import {useState} from "react";
import BookingService from "services/BookingService";
import {Booking} from "common/types/Booking";

const useBookings = () => {
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [booking, setBooking] = useState<Booking>();

    const fetchBookings = () => {
        return new Promise((resolve, reject) => {
            setBookingsLoading(true);
            return BookingService.index()
                .then((res: any) => {
                    setBookings(res.data);
                    resolve(true);
                })
                .catch((e: any) => reject(e))
                .finally(() => setBookingsLoading(false));
        })
    }

    const fetchBooking = (id: string) => {
        return new Promise((resolve, reject) => {
            setBookingsLoading(true);
            return BookingService.show(id)
                .then((res: any) => {
                    setBooking(res);
                    resolve(true);
                })
                .catch((e: any) => reject(e))
                .finally(() => setBookingsLoading(false));
        })
    }

    return {
        bookingsLoading,
        bookings,
        booking,
        fetchBookings,
        fetchBooking
    }
}

export default useBookings;