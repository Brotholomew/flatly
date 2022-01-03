import {Booking} from "common/types/Booking";
import {useNavigate} from "react-router-dom";
import Button from "components/utils/Button";
import {ButtonType} from "common/enums/ButtonType";

interface BookingListItemProps {
    booking: Booking
    cancelCallback: (booking: Booking) => void
}

function BookingListItem(props: BookingListItemProps) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`${process.env.PUBLIC_URL}/bookings/${props.booking.id}/details`);
    }

    const handleCancelClick = props.cancelCallback;

    return (
        <div className="list-item">
            <ul>
                <li>Renter: { props.booking.renter.name }</li>
                <li>Flat name: { props.booking.flat.name }</li>
                <li>Check-in date: { props.booking.checkInDate }</li>
                <li>Check-out date: { props.booking.checkOutDate }</li>
            </ul>
            <div className="list-item__buttons">
                <Button
                    click={() => handleDetailsClick()}
                    icon="eye"
                >
                    Details
                </Button>
                <Button
                    click={() => handleCancelClick(props.booking)}
                    type={ButtonType.ERROR}
                    icon="trash"
                >
                    Cancel booking
                </Button>
            </div>
        </div>
    )
}

export default BookingListItem;