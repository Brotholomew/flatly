import {WithChildren} from "common/types/PropTypes";
import {ButtonType} from "common/enums/ButtonType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps extends WithChildren {
    click?: Function,
    type?: ButtonType,
    icon?: string,
    loading?: boolean,
    htmlType?: 'button' | 'submit' | 'reset'
}

function Button(props: ButtonProps) {
    const handleClick = () => {
        if (props.click) props.click();
    }

    const renderButtonContent = () => {
        return (
            <>
                {
                    props.icon
                        // @ts-ignore
                        ? <FontAwesomeIcon icon={props.icon} style={{marginRight: '2px'}}/>
                        : ''
                }
                { props.children }
            </>
        )
    }

    return (
        <button
            className={`default-button default-button--${props.type ?? 'info'}`}
            onClick={() => handleClick()}
            type={props.htmlType ?? 'button' }
        >
            {
                props.loading
                    ? <span>Loading</span>
                    : renderButtonContent()
            }
        </button>
    );
}

export default Button;