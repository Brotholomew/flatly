import useFlats from "modules/useFlats";
import {Flat} from "common/types/Flat";
import FlatListItem from "components/flats/FlatListItem";
import {useMount} from "react-use";
import Skeleton from 'react-loading-skeleton';

function FlatsList() {
    const { flatsLoading, flats, fetchFlats } = useFlats();

    useMount(() => fetchFlats());

    const renderFlatsList = () => {
        return flats.map((flat: Flat) => <FlatListItem flat={flat} key={flat.id}/>);
    }

    const renderSkeleton = () => {
        return Array.from(Array(5).keys()).map((i: number) => <div key={i}>
            <Skeleton count={3}/>
        </div>)
    }

    return (
        <div>
            {
                flatsLoading
                ? renderSkeleton()
                : renderFlatsList()
            }
        </div>
    );
}

export default FlatsList;