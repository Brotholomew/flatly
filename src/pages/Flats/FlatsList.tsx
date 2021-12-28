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
import {useDispatch, useSelector} from "react-redux";
import {FLATS_CURRENT_PAGE} from "../../store/modules/pagination/types";
import Pagination from "../../components/pagination/pagination";
import {setPagination} from "../../store/modules/pagination/actions";

function FlatsList() {
    const { flatsLoading, flats, fetchFlats } = useFlats();
    const { currentPageFlats, maxPageFlats } = useSelector((state: any) => state.paginationReducers);
    const { error, success } = useNotification();

    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [toBeDeleted, setToBeDeleted] = useState<Flat | null>(null);

    useMount(() => fetchFlats(currentPageFlats === 0 ? null : currentPageFlats));

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

    const changePage = (page: number) => {
        dispatch(setPagination(FLATS_CURRENT_PAGE, {page: Math.max(1, Math.min(page, maxPageFlats))}));
        fetchFlats(page === 0 ? null : page).finally();
    }

    return (
        <div>
            <DeletePopup show={showPopup} close={setShowPopup} flat={toBeDeleted} deleteFlatCallback={deleteFlat}/>
            <Link to={`${process.env.PUBLIC_URL}/flats/add`}>Create new flat</Link>
            {
                flatsLoading
                ? renderSkeleton()
                :
                    <>
                        {renderFlatsList()}
                        <Pagination
                            maxNumber={maxPageFlats}
                            currentPage={currentPageFlats}
                            changePage={changePage} />
                    </>
            }
        </div>
    );
}

export default FlatsList;