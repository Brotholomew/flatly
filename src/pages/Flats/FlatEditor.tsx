import {useLocation} from "react-router-dom";
import Button from "../../components/utils/Button";
import {useNavigate} from "react-router-dom";
import FlatForm from "../../components/forms/FlatForm";
import {Flat} from "../../common/types/Flat";
import generateID from "../../common/helpers/generateID";

interface FlatEditorParams {
    mode: 'edit' | 'add'
}

function FlatEditor(props: FlatEditorParams) {
    const navigate = useNavigate();
    const { state } = useLocation();
    let flat: any = {};

    if (props.mode === 'edit')
        flat = state;
    else
        flat.id = generateID();

    const updateFlat = (flat: Flat) => {
        // TODO: server update fields & server add new fields
    }

    return (
        <div>
            <Button
                icon="chevron-left"
                loading={false}
                click={() => navigate('/flats')}
            >
                Back
            </Button>

            <FlatForm updateFlatCallback={updateFlat} initialState={flat}/>
        </div>
    );
}

export default FlatEditor;