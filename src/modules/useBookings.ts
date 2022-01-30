import {useState} from "react";
import BookingService from "services/BookingService";
import {Booking} from "common/types/Booking";
import {setPagination} from "../store/modules/pagination/actions";
import {BOOKINGS_CURRENT_PAGE, BOOKINGS_MAX_PAGE} from "../store/modules/pagination/types";
import {useDispatch} from "react-redux";

const useBookings = () => {
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [booking, setBooking] = useState<Booking>();

    const dispatch = useDispatch();

    const fetchBookings = (page: number | null = null) => {
        return new Promise((resolve, reject) => {
            setBookingsLoading(true);
            return BookingService.index(page === null ? null : { page })
                .then((res: any) => {
                    setBookings(res.data);
                    const maxPage = res.pagination.totalPages;
                    const currentPage = Math.min(maxPage, res.pagination.page);
                    dispatch(setPagination(BOOKINGS_MAX_PAGE, {page: maxPage}));
                    dispatch(setPagination(BOOKINGS_CURRENT_PAGE, {page: currentPage}))
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

    const fetchFlatBookings = (flatID: number | undefined) => {
        if (flatID === undefined)
            return fetchBookings();

        setBookingsLoading(true);
        return new Promise((resolve, reject) => {
            return BookingService.index({"id": flatID})
                .then((res: any) =>
                {
                    setBookings(res.data);
                    const maxPage = res.pagination.totalPages;
                    const currentPage = Math.min(maxPage, res.pagination.page);
                    dispatch(setPagination(BOOKINGS_MAX_PAGE, {page: maxPage}));
                    dispatch(setPagination(BOOKINGS_CURRENT_PAGE, {page: currentPage}))

                    if (res.data.length === 0)
                        reject();

                    resolve(res.data);
                })
                .catch((e: any) => reject(e))
                .finally(() => setBookingsLoading(false));
        });
    }

    return {
        bookingsLoading,
        bookings,
        booking,
        fetchBookings,
        fetchBooking,
        fetchFlatBookings
    }
}

export default useBookings;