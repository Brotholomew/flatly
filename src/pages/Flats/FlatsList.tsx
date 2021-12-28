import useFlats from "modules/useFlats";
import {Flat} from "common/types/Flat";
import FlatListItem from "components/flats/FlatListItem";
import {useMount} from "react-use";
import Skeleton from 'react-loading-skeleton';
import {Link} from "react-router-dom";
import DeletePopup from "../../components/popup/deletePopup";
import {useState} from "react";
import FlatService from "../../services/FlatService";
import useNotification from "../../modules/useNotification";


function FlatsList() {
    const { flatsLoading, flats, fetchFlats } = useFlats();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [toBeDeleted, setToBeDeleted] = useState<Flat | null>(null);
    const { error, success } = useNotification();

    useMount(() => fetchFlats());

    const renderFlatsList = () => {
        return flats.map((flat: Flat) => <FlatListItem flat={flat} key={flat.id} deleteCallback={triggerFlatDeletion}/>);
    }

    const renderSkeleton = () => {
        return Array.from(Array(5).keys()).map((i: number) => <div key={i}>
            <Skeleton count={3}/>
        </div>)
    }

    const triggerFlatDeletion = (flat: Flat) => {
        setToBeDeleted(flat);
        setShowPopup(true);
    }

    const deleteFlat = (flat: Flat) => {
        if (flat.id !== undefined) FlatService.destroy(flat.id)
            .then(() => success({title: 'Delete operation succeeded', message: 'successfully deleted the flat'}))
            .catch((e: any) => error({title: 'Delete operation failed', message: 'failed to delete the flat'}))
            .finally(() => { setShowPopup(false); setToBeDeleted(null); fetchFlats(); });
    }


    return (
        <div>
            <DeletePopup show={showPopup} close={setShowPopup} flat={toBeDeleted} deleteFlatCallback={deleteFlat}/>
            <Link to={`${process.env.PUBLIC_URL}/flats/add`}>Create new flat</Link>
            {
                flatsLoading
                ? renderSkeleton()
                : renderFlatsList()
            }
        </div>
    );
}

export default FlatsList;