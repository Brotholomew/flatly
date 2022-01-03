import useBookings from "modules/useBookings";
import {Booking} from "common/types/Booking";
import BookingListItem from "components/bookings/BookingListItem";
import {useMount} from "react-use";
import Skeleton from 'react-loading-skeleton';
import {useState} from "react";
import useNotification from "../../modules/useNotification";
import BookingService from "../../services/BookingService";
import CancelPopup from "../../components/popup/cancelPopup";

function BookingsList() {
    const { bookingsLoading, bookings, fetchBookings } = useBookings();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [toBeCanceled, setToBeCanceled] = useState<Booking | null>(null);
    const { error, success } = useNotification();

    useMount(() => fetchBookings());

    const renderBookingsList = () => {
        return bookings.map((booking: Booking) =>
            <BookingListItem booking={booking} key={booking.id} cancelCallback={triggerCancelBooking}/>);
    }

    const renderSkeleton = () => {
        return Array.from(Array(5).keys()).map((i: number) => <div key={i}>
            <Skeleton count={3}/>
        </div>)
    }

    const triggerCancelBooking = (booking: Booking) => {
        setToBeCanceled(booking);
        setShowPopup(true);
    }

    const deleteBooking = (booking: Booking) => {
        if (booking.id !== undefined) BookingService.destroy(booking.id)
            .then(() => success({title: 'Delete operation succeeded', message: 'successfully deleted the booking'}))
            .catch((e: any) => error({title: 'Delete operation failed', message: 'failed to delete the booking'}))
            .finally(() => { setShowPopup(false); setToBeCanceled(null); fetchBookings(); });
    }

    return (
        <div>
            <CancelPopup show={showPopup} close={setShowPopup} booking={toBeCanceled} cancelBookingCallback={deleteBooking}/>
            {
                bookingsLoading
                ? renderSkeleton()
                : renderBookingsList()
            }
        </div>
    );
}

export default BookingsList;