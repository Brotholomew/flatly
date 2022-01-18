import useAuth from "modules/useAuth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {SUPPORTED_PAGES} from "../store/modules/page/types";
import {useSelector} from "react-redux";

function Home() {
    const { logout } = useAuth();
    const [chosenPage] = useState<SUPPORTED_PAGES>(useSelector((state: any) => state.pageReducers));
    const navigate = useNavigate();

    console.log(chosenPage);

    setTimeout(() => {
        if (chosenPage === 'flats')
            navigate(`${process.env.PUBLIC_URL}/flats`);
        else
            navigate(`${process.env.PUBLIC_URL}/bookings`);
    }, 1);

    return (
        <></>
    );
}

export default Home;