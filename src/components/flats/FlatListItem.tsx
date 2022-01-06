import {Flat} from "common/types/Flat";
import {firstLine, secondLine} from "common/helpers/addressConverter";
import {useNavigate} from "react-router-dom";
import Button from "components/utils/Button";
import {ButtonType} from "common/enums/ButtonType";
import Picture from "components/utils/Picture";

interface FlatListItemProps {
    flat: Flat,
    deleteCallback: (flat: Flat) => void
}

function FlatListItem(props: FlatListItemProps) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`${process.env.PUBLIC_URL}/flats/${props.flat.id}/details`);
    }

    const handleEditClick = () => {
        navigate(`${process.env.PUBLIC_URL}/flats/${props.flat.id}/edit`);
    }

    const handleDeleteClick = props.deleteCallback;

    return (
        <div className="list-item">
            <h2>{ props.flat.name }</h2>
            <Picture image={props.flat.images[0]} key={props.flat.images[0]?.id}/>
            <ul>
                <li>{ props.flat.rooms } rooms</li>
                <li>{ firstLine(props.flat.address)} </li>
                <li>{ secondLine(props.flat.address)} </li>
            </ul>
            <div className="list-item__buttons">
                <Button
                    click={() => handleDetailsClick()}
                    icon="eye"
                >
                    Details
                </Button>
                <Button
                    click={() => handleEditClick()}
                    type={ButtonType.INFO}
                    icon="pen"
                >
                    Edit
                </Button>
                <Button
                    click={() => handleDeleteClick(props.flat)}
                    type={ButtonType.ERROR}
                    icon="trash"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default FlatListItem;