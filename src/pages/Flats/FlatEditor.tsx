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
import useFacilities from "../../modules/useFacilities";

function FlatEditor() {
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const { pathname } = useLocation();
    const { flat, fetchFlat } = useFlats();
    const { success, error } = useNotification();
    const { fetchFacility, saveFacility } = useFacilities();

    const navigate = useNavigate();
    const addMode = !pathname.includes('edit');

    useMount(() => {
        if (!addMode) {
            fetchFlat(parseInt(id as string))
                .catch(() => {
                    error({title: "Flat with provided id has not been found!"});
                    navigate(`${process.env.PUBLIC_URL}/flats`);
                });
    }});

    const updateFlat = (flat: Flat) => {
        const data: any = flat;
        data.images = data.images.map((image: any) => image.id);

        setLoading(true);
        if (addMode) {
            FlatService.store(data)
                .then(() => success({title: 'successfully added the flat'}))
                .catch(() => console.error('Error while adding the flat'))
                .finally(() => setLoading(false));
        } else {
            FlatService.update(flat.id as number, data)
                .then(() => success({title: 'successfully updated the flat'}))
                .catch(() => console.error('Error while updating the flat'))
                .finally(() => setLoading(false));
        }
    }

    return (
        <div className={'editor'}>
            <Button
                icon="chevron-left"
                click={() => navigate(`${process.env.PUBLIC_URL}/flats`)}
            >
                Back
            </Button>

            <FlatForm updateFlatCallback={updateFlat}
                      initialState={addMode ? EmptyFlat : (flat ? flat : EmptyFlat)}
                      loading={loading}
                      addFacility={saveFacility}
                      fetchFacility={fetchFacility}
            />
        </div>
    );
}

export default FlatEditor;