import useBookings from "modules/useBookings";
import {Booking} from "common/types/Booking";
import BookingListItem from "components/bookings/BookingListItem";
import {useMount} from "react-use";
import Skeleton from 'react-loading-skeleton';

function BookingsList() {
    const { bookingsLoading, bookings, fetchBookings } = useBookings();

    useMount(() => fetchBookings());

    const renderBookingsList = () => {
        return bookings.map((booking: Booking) => <BookingListItem booking={booking} key={booking.id}/>);
    }

    const renderSkeleton = () => {
        return Array.from(Array(5).keys()).map((i: number) => <div key={i}>
            <Skeleton count={3}/>
        </div>)
    }

    return (
        <div>
            {
                bookingsLoading
                ? renderSkeleton()
                : renderBookingsList()
            }
        </div>
    );
}

export default BookingsList;