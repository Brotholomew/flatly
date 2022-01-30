import {Flat} from "../../common/types/Flat";
import Popup from "./popup";
import {ButtonType} from "../../common/enums/ButtonType";
import Picture from "../utils/Picture";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useBookings from "../../modules/useBookings";

export interface deletePopupInterface {
    flat: Flat | null,
    deleteFlatCallback: (flat: Flat) => void,
    show: boolean,
    close: (flag: boolean) => void,
}

const DeletePopup = (props: deletePopupInterface) => {
    const [active, setActive] = useState<boolean>(false);
    const { fetchFlatBookings } = useBookings();

    useEffect(() => {
        if (props?.flat === undefined) return;

        fetchFlatBookings(props?.flat?.id)
            .then((rsp: any) => {
                if (rsp)
                    setActive(true);
            })
            .catch(() => setActive(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flat]);

    const navigate = useNavigate();
    const header = 'Delete flat'
    const title = !active ? 'Confirm flat deletion' : 'Can\'t delete the flat';
    const info = !active ? null : 'First cancel all the bookings on this flat';
    const buttons = !active
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
                        click: () => navigate(`${process.env.PUBLIC_URL}/bookings/flat/${props?.flat?.id}`), // TODO: add navigation to bookings with this flat
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
                    <div className={'popup-picture'}>
                        <Picture image={props.flat.images[0]}/>
                    </div>
                    <div className={'popup-info'}>
                        <h4>Flat name:</h4> <h2>{props.flat.name}</h2>
                        <div className={"separator-empty"} />

                        <h4>No of rooms:</h4> <h2>{props.flat.rooms}</h2>
                        <div className={"separator-empty"} />

                        <h4>Street name:</h4> <h2>{props.flat.address.streetName}</h2>
                        <div className={"separator-empty"} />

                        <h4>Postal code:</h4> <h2>{props.flat.address.postalCode}</h2>
                        <div className={"separator-empty"} />
                    </div>
                </Popup>
            }
        </>
    );
}

export default DeletePopup;