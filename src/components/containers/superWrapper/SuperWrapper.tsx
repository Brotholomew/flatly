import {useSelector} from "react-redux";
import CreateRoutes from "../../../routes/CreateRoutes";


const SuperWrapper = () => {
    let style = useSelector((state: any) => state.styleReducers);

    return (
        <div className={style}>
            <div className={'super-wrapper'}>
                <CreateRoutes />
            </div>
        </div>
    );
}

export default SuperWrapper;