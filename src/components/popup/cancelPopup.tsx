import {Booking} from "../../common/types/Booking";
import Popup from "./popup";
import {ButtonType} from "../../common/enums/ButtonType";
import Picture from "../utils/Picture";

export interface cancelPopupInterface {
    booking: Booking | null,
    cancelBookingCallback: (booking: Booking) => void,
    show: boolean,
    close: (flag: boolean) => void,
}

const CancelPopup = (props: cancelPopupInterface) => {
    const isCurrent = (dateString: string | undefined) => {
        if(dateString === undefined)
            return false;
        const date = Date.parse(dateString);
        return date <= Date.now()
    }

    const header = 'Cancel booking'
    const title = isCurrent(props.booking?.checkOutDate) ? 'Confirm booking cancelation' : 'Can\'t cancel the booking';
    const info = isCurrent(props.booking?.checkInDate) ? null : 'The renting currently takes place';
    const buttons =
        [{
            text: 'Cancel booking',
            props: {
                type: ButtonType.POPUP_FN,
                disabled: !isCurrent(props.booking?.checkOutDate),
                click: () => {
                    if (props.booking !== null)
                        props.cancelBookingCallback(props.booking);
                }
            }
        },
            {
                text: 'Back',
                props: {
                    type: ButtonType.POPUP_FN,
                    click: props.close
                }
            }];


    return(
        <>
            {props.booking !== null &&
                <Popup show={props.show} close={props.close} buttons={buttons} header={header}>
                    <div className={'popup-title'}>
                        <h1>{title}</h1>
                        {info !== null && <p>{info}</p>}
                    </div>
                    <div className={'popup-info'}>
                        <h3>Renter:</h3> <h2>{props.booking.userData}</h2>
                        <h3>Flat:</h3> <h2>{props.booking.flat.name}</h2>
                        <h3>Check in:</h3> <h2>{props.booking.checkInDate}</h2>
                        <h3>Check out:</h3> <h2>{props.booking.checkOutDate}</h2>
                    </div>
                    <div className={'popup-picture'}>
                        <Picture image={props.booking.flat.images[0]} key={props.booking.flat.images[0]?.id}/>
                    </div>
                </Popup>
            }
        </>
    );
}

export default CancelPopup;