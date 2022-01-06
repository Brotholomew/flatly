import {Flat} from "../../common/types/Flat";
import Popup from "./popup";
import {ButtonType} from "../../common/enums/ButtonType";
import Picture from "../utils/Picture";

export interface deletePopupInterface {
    flat: Flat | null,
    deleteFlatCallback: (flat: Flat) => void,
    show: boolean,
    close: (flag: boolean) => void,
}

const DeletePopup = (props: deletePopupInterface) => {
    const header = 'Delete flat'
    const title = props.flat?.active ? 'Confirm flat deletion' : 'Can\'t delete the flat';
    const info = props.flat?.active ? null : 'First cancel all the bookings on this flat';
    const buttons = props.flat?.active
        ?
            [{
                text: 'Delete',
                props: {
                    type: ButtonType.POPUP_FN,
                    click: () => {
                        if (props.flat !== null)
                            props.deleteFlatCallback(props.flat);
                    }
                }
            },
            {
                text: 'Cancel',
                props: {
                    type: ButtonType.POPUP_FN,
                    click: props.close
                }
            }]
        :
            [
                {
                    text: 'Show bookings',
                    props: {
                        disabled: true, // TODO: add navigation to bookings with this flat
                        type: ButtonType.POPUP_FN,
                    }
                },
                {
                    text: 'Cancel',
                    props: {
                        type: ButtonType.POPUP_FN,
                        click: props.close
                    }
                }
            ];

    return(
        <>
            {props.flat !== null &&
                <Popup show={props.show} close={props.close} buttons={buttons} header={header}>
                    <div className={'popup-title'}>
                        <h1>{title}</h1>
                        {info !== null && <p>{info}</p>}
                    </div>
                    <div className={'popup-info'}>
                        <h3>Flat name:</h3> <h2>{props.flat.name}</h2>
                        <h3>No of rooms:</h3> <h2>{props.flat.rooms}</h2>
                        <h3>Street name:</h3> <h2>{props.flat.address.streetName}</h2>
                        <h3>Postal code:</h3> <h2>{props.flat.address.postalCode}</h2>
                    </div>
                    <div className={'popup-picture'}>
                        <Picture image={props.flat.images[0]}/>
                    </div>
                </Popup>
            }
        </>
    );
}

export default DeletePopup;