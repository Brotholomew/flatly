import {useNavigate, useParams} from "react-router-dom";
import useFlats from "modules/useFlats";
import {useMount} from "react-use";
import useNotification from "modules/useNotification";
import {full} from "common/helpers/addressConverter";
import Skeleton from 'react-loading-skeleton';

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
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{ flat?.id ?? <Skeleton width={80}/> }</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{ flat?.name ?? <Skeleton width={200}/> }</td>
                        </tr>
                        <tr>
                            <td>Rooms</td>
                            <td>{ flat?.rooms ?? <Skeleton width={40}/>}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{ flat?.area ?? <Skeleton/> }</td>
                        </tr>
                        <tr>
                            <td>Facilities</td>
                            <td>{
                                flat?.facilities
                                    ? flat?.facilities.map(item => item.name).join(', ')
                                    : <Skeleton width={180}/> }
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{ flat?.address ? full(flat?.address) : <Skeleton width={200}/> }</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{ flat?.description ?? <Skeleton count={4}/> }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FlatDetails;