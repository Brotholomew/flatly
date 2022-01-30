import {useLocation, useNavigate} from "react-router-dom";
import GlobalHeader from "../../utils/GlobalHeader";
import {useEffect, useState} from "react";
import {SUPPORTED_PAGES} from "../../../store/modules/page/types";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../store/modules/page/actions";

function Header() {
    const [chosenPage, setChosenPage] = useState<SUPPORTED_PAGES>(useSelector((state: any) => state.pageReducers));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const chooseFlats = (nav: boolean = true) => {
        dispatch(setPage('flats'));
        if (nav) navigate(`${process.env.PUBLIC_URL}/flats`);
        setChosenPage('flats');
    }

    const chooseBookings = (nav: boolean = true) => {
        dispatch(setPage('bookings'));
        if (nav) navigate(`${process.env.PUBLIC_URL}/bookings`);
        setChosenPage('bookings');
    }

    useEffect(() => {
        if (pathname.includes('bookings'))
            chooseBookings(false);
        else
            chooseFlats(false);
    })

    return (
        <GlobalHeader
            extended={true}
            sbProps={
                {
                    options: [
                        {
                            title: 'Flats',
                            callback: chooseFlats
                        },
                        {
                            title: 'Bookings',
                            callback: chooseBookings
                        }
                    ],
                    selectedIndex: chosenPage === 'flats' ? 0 : 1
                }
            }
        />
    );

}

export default Header;