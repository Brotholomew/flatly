import {useState} from "react";
import FlatService from "services/FlatService";
import {Flat} from "common/types/Flat";
import {useDispatch} from "react-redux";
import {setPagination} from "../store/modules/pagination/actions";
import {FLATS_CURRENT_PAGE, FLATS_MAX_PAGE} from "../store/modules/pagination/types";

const useFlats = () => {
    const [flatsLoading, setFlatsLoading] = useState(false);
    const [flats, setFlats] = useState<Flat[]>([]);
    const [flat, setFlat] = useState<Flat>();
    const dispatch = useDispatch();

    const fetchFlats = (params: any | null = null) => {
        return new Promise((resolve, reject) => {
            setFlatsLoading(true);
            return FlatService.index(params === null ? null : params)
                .then((res: any) => {
                    setFlats(res.data);
                    const maxPage = Math.max(1, res.pagination.totalPages);
                    const currentPage = Math.max(1, Math.min(maxPage, res.pagination.page));
                    dispatch(setPagination(FLATS_MAX_PAGE, {page: maxPage}));
                    dispatch(setPagination(FLATS_CURRENT_PAGE, {page: currentPage}))
                    resolve(true);
                })
                .catch((e: any) => reject(e))
                .finally(() => setFlatsLoading(false));
        })
    }

    const fetchFlat = (id: number) => {
        return new Promise((resolve, reject) => {
            setFlatsLoading(true);
            return FlatService.show(id)
                .then((res: any) => {
                    setFlat(res);
                    resolve(true);
                })
                .catch((e: any) => reject(e))
                .finally(() => setFlatsLoading(false));
        })
    }

    return {
        flatsLoading,
        flats,
        flat,
        fetchFlats,
        fetchFlat
    }
}

export default useFlats;