import {Booking} from "common/types/Booking";
import {useNavigate} from "react-router-dom";
import Button from "components/utils/Button";
import {ButtonType} from "common/enums/ButtonType";
import Picture from "../utils/Picture";

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
            <div className={"list-item-prop list-item-header"}><h2>{ props.booking.flat.name }</h2></div>
            <div className={"list-item-prop list-item-picture"}><Picture image={props.booking.flat.images[0]} key={props.booking.flat.images[0]?.id}/></div>
            <ul className={"list-item-prop list-item-info"}>
                <li>Renter: { props.booking.userData }</li>
                <li>Check-in date: { props.booking.checkInDate }</li>
                <li>Check-out date: { props.booking.checkOutDate }</li>
            </ul>
            <div className="list-item-prop list-item-buttons">
                <Button
                    click={() => handleDetailsClick()}
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