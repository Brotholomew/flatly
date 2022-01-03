import {useNavigate, useParams} from "react-router-dom";
import useBookings from "modules/useBookings";
import {useMount} from "react-use";
import useNotification from "modules/useNotification";
import {full} from "../../common/helpers/addressConverter";
import Skeleton from 'react-loading-skeleton';
import Button from "../../components/utils/Button";

function BookingDetails() {
    const { id } = useParams();
    const { booking, fetchBooking } = useBookings();
    const navigate = useNavigate();
    const { error } = useNotification();

    useMount(() => fetchBooking(id as string).catch(() => {
        error({ title: "Booking with provided id has not been found!" });
        navigate(`${process.env.PUBLIC_URL}'/bookings`);
    }));

    return (
        <div>
            <Button
                icon="chevron-left"
                click={() => navigate(`${process.env.PUBLIC_URL}/bookings`)}
            >
                Back
            </Button>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>A booking for:</td>
                        </tr>
                        <tr>
                            <td>{ booking?.renter.name ?? <Skeleton width={200}/> }</td>
                        </tr>
                        <tr>
                            <td>{ booking?.renter.email ?? <Skeleton width={200}/> }</td>
                        </tr>
                        <tr>
                            <td>{ booking?.renter.phoneNumber ?? <Skeleton width={200}/> }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Details:</td>
                        </tr>
                        <tr>
                            <td>Check in:</td>
                            <td>{ booking?.checkInDate ?? <Skeleton width={50}/>}</td>
                        </tr>
                        <tr>
                            <td>Check out:</td>
                            <td>{ booking?.checkOutDate ?? <Skeleton width={50}/> }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Flat</td>
                        </tr>
                        <tr>
                            <td>{ booking?.flat.name ?? <Skeleton width={200}/> }</td>
                        </tr>
                        <tr>
                            <td>{ booking?.flat.rooms ?? <Skeleton width={40}/>}</td>
                        </tr>
                        <tr>
                            <td>{ booking?.flat.address ? full(booking?.flat.address) : <Skeleton width={200}/> }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookingDetails;