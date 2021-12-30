import Button, {ButtonProps} from "../utils/Button";
import {WithChildren} from "../../common/types/PropTypes";
import {ButtonType} from "../../common/enums/ButtonType";

import './popup.scss'

export interface buttonsInterface {
    text: string,
    props: ButtonProps
}

interface popupInterface extends WithChildren {
    buttons?: buttonsInterface[],
    header?: string,
    show: boolean,
    close: (flag: boolean) => void,
}

const Popup = (props: popupInterface) => {
    return (
        <>
            {props.show &&
                <div className={'popup-blur'}>
                    <div className={'popup-window'}>
                        <div className={'popup-header'}>
                            <h3>{props.header}</h3>
                            <Button
                                icon={'times'}
                                click={props.close}
                                type={ButtonType.POPUP_CLOSE}
                            />
                        </div>
                        <div className={'popup-inner'}> {props.children} </div>
                        <div className={'popup-buttons'}>
                            {props.buttons?.map((value, index) =>
                                <Button
                                    {...value.props}
                                    key={index}
                                >
                                    {value.text}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Popup;