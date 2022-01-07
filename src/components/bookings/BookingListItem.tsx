import {Booking} from "common/types/Booking";
import {useNavigate} from "react-router-dom";
import Button from "components/utils/Button";
import {ButtonType} from "common/enums/ButtonType";

interface BookingListItemProps {
    booking: Booking
}

function BookingListItem(props: BookingListItemProps) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`${process.env.PUBLIC_URL}/bookings/${props.booking.id}/details`);
    }

    const handleCancelClick = () => {
        
    }

    return (
        <div className="list-item">
            <ul>
                <li>Renter: { props.booking.userData }</li>
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
                    click={() => handleCancelClick()}
                    type={ButtonType.ERROR}
                    icon="trash"
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default BookingListItem;