import {useNavigate, useParams} from "react-router-dom";
import useFlats from "modules/useFlats";
import {useMount} from "react-use";
import useNotification from "modules/useNotification";
import {full} from "common/helpers/addressConverter";
import Skeleton from 'react-loading-skeleton';
import Button from "../../components/utils/Button";
import Picture from "components/utils/Picture";

function FlatDetails() {
    const { id } = useParams();
    const { flat, fetchFlat } = useFlats();
    const navigate = useNavigate();
    const { error } = useNotification();

    useMount(() => fetchFlat(parseInt(id as string)).catch(() => {
        error({ title: "Flat with provided id has not been found!" });
        navigate(`${process.env.PUBLIC_URL}'/flats`);
    }));


    return (
        <div className={"details"}>
            <Button
                icon="chevron-left"
                click={() => navigate(`${process.env.PUBLIC_URL}/flats`)}
            >
                Back
            </Button>
            <div>
                <label>ID</label>
                <h3>{ flat?.id ?? <Skeleton width={80}/> }</h3>
                <div className={'separator-empty'} />

                <label>Name</label>
                <h3>{ flat?.name ?? <Skeleton width={200}/> }</h3>
                <div className={'separator-empty'} />

                <label>Rooms</label>
                <h3>{ flat?.rooms ?? <Skeleton width={40}/>}</h3>
                <div className={'separator-empty'} />

                <label>Area</label>
                <h3>{ flat?.area ?? <Skeleton/> }</h3>
                <div className={'separator-empty'} />
                <label>Facilities</label>
                <h3>{
                    flat?.facilities
                        ? flat?.facilities.map(item => item.name).join(', ')
                        : <Skeleton width={180}/> }
                </h3>
                <div className={'separator-empty'} />

                <label>Address</label>
                <h3>{ flat?.address ? full(flat?.address) : <Skeleton width={200}/> }</h3>
                <div className={'separator-empty'} />

                <label>Description</label>
                <h3>{ flat?.description ?? <Skeleton count={4}/> }</h3>
                <div className={'separator-empty'} />

                <label>Images</label>
                <div className={"image-item-wrapper"}>
                    {flat?.images.map((image, index) => (
                        <div key={index} className="image-item">
                            <Picture image={image}/>
                        </div>
                    ))}
                </div>
                <div className={'separator-empty'} />
            </div>
        </div>
    );
}

export default FlatDetails;