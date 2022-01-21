import useBookings from "modules/useBookings";
import {Booking} from "common/types/Booking";
import BookingListItem from "components/bookings/BookingListItem";
import {useMount} from "react-use";
import Skeleton from 'react-loading-skeleton';
import {useState} from "react";
import useNotification from "../../modules/useNotification";
import BookingService from "../../services/BookingService";
import CancelPopup from "../../components/popup/cancelPopup";
import Pagination from "../../components/pagination/pagination";
import {useDispatch, useSelector} from "react-redux";
import {setPagination} from "../../store/modules/pagination/actions";
import {BOOKINGS_CURRENT_PAGE} from "../../store/modules/pagination/types";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function BookingsList() {
    const { bookingsLoading, bookings, fetchBookings, fetchFlatBookings } = useBookings();
    const { currentPageBookings, maxPageBookings } = useSelector((state: any) => state.paginationReducers);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [toBeCanceled, setToBeCanceled] = useState<Booking | null>(null);
    const { error, success } = useNotification();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pathname } = useLocation();

    useMount(() => {
        if (pathname.includes('flat')) {
            fetchFlatBookings(Number(id))
                .then((rsp: any) => {
                    if (rsp === undefined) {
                        fetchBookings();
                        navigate(`${process.env.PUBLIC_URL}/bookings`);
                    }
                })
                .catch(() =>  {
                    fetchBookings();
                    navigate(`${process.env.PUBLIC_URL}/bookings`)
                });
        } else {
            fetchBookings();
        }
    });

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

    const changePage = (page: number) => {
        dispatch(setPagination(BOOKINGS_CURRENT_PAGE, {page: Math.max(1, Math.min(page, maxPageBookings))}));
        fetchBookings(page === 0 ? null : page).finally();
    }

    return (
        <div className={'list'}>
            <CancelPopup show={showPopup} close={setShowPopup} booking={toBeCanceled} cancelBookingCallback={deleteBooking}/>
            {
                bookingsLoading
                ? renderSkeleton()
                :
                    <>
                        {renderBookingsList()}
                        <Pagination
                            maxNumber={maxPageBookings}
                            currentPage={currentPageBookings}
                            changePage={changePage} />
                    </>
            }
        </div>
    );
}

export default BookingsList;