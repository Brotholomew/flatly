import { useParams, useLocation } from "react-router-dom";
import Button from "../../components/utils/Button";
import {useNavigate} from "react-router-dom";
import FlatForm from "../../components/forms/FlatForm";
import {Flat, EmptyFlat } from "../../common/types/Flat";
import {useMount} from "react-use";
import useFlats from "modules/useFlats";
import useNotification from "../../modules/useNotification";
import {useState} from "react";
import FlatService from "../../services/FlatService";

function FlatEditor() {
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const { pathname } = useLocation();
    const { flat, fetchFlat } = useFlats();
    const { error } = useNotification();

    const navigate = useNavigate();
    const addMode = !pathname.includes('edit');

    useMount(() => {
        if (!addMode) {
            fetchFlat(id as string)
                .catch(() => {
                    error({title: "Flat with provided id has not been found!"});
                    navigate('/flats');
                });
    }});

    const updateFlat = (flat: Flat) => {
        setLoading(true);
        if (addMode) {
            FlatService.store(flat)
                .catch(() => console.error('Error while adding the flat'))
                .finally(() => setLoading(false));
        } else {
            FlatService.update(flat.id, flat)
                .catch(() => console.error('Error while updating the flat'))
                .finally(() => setLoading(false));
        }

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

            <FlatForm updateFlatCallback={updateFlat} initialState={addMode ? EmptyFlat : flat} loading={loading}/>
        </div>
    );
}

export default FlatEditor;