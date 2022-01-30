import {useNavigate, useParams} from "react-router-dom";
import useBookings from "modules/useBookings";
import {useMount} from "react-use";
import useNotification from "modules/useNotification";
import {full} from "../../common/helpers/addressConverter";
import Skeleton from 'react-loading-skeleton';
import Button from "../../components/utils/Button";
import Picture from "../../components/utils/Picture";

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
        <div className={"details"}>
            <Button
                icon="chevron-left"
                click={() => navigate(`${process.env.PUBLIC_URL}/bookings`)}
            >
                Back
            </Button>
            <div>
                <label>A booking for:</label>
                <h3>{ booking?.userData ?? <Skeleton width={200}/> }</h3>
                <div className={'separator-empty'} />

                <label>Details:</label>
                <div className={'separator-empty'} />

                <label>Check in:</label>
                <h3>{ booking?.startDateTime ?? <Skeleton width={50}/>}</h3>
                <div className={'separator-empty'} />

                <label>Is active</label>
                <h3>{ (booking?.active ? 'Yes' : 'No') ?? <Skeleton/> }</h3>
                <div className={'separator-empty'} />

                <h2>Flat:</h2>
                <label>Name</label>
                <h3>{ booking?.flat.name ?? <Skeleton width={200}/> }</h3>
                <div className={'separator-empty'} />

                <label>Rooms</label>
                <h3>{ booking?.flat.rooms ?? <Skeleton width={40}/>} rooms</h3>
                <div className={'separator-empty'} />

                <label>Address</label>
                <h3>{ booking?.flat.address ? full(booking?.flat.address) : <Skeleton width={200}/> }</h3>
                <div className={'separator-empty'} />

                <label>Images</label>
                <div className={"image-item-wrapper"}>
                    {booking?.flat?.images.map((image, index) => (
                        <div key={index} className="image-item">
                            <Picture image={image}/>
                        </div>
                    ))}
                </div>
                <div className={'separator-empty'} />
            </div>
        </div>
    );
}

export default BookingDetails;