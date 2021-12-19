import {Navigate, Outlet} from "react-router-dom";
import useAuth from "modules/useAuth";

function OnlyGuestGuard() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to={`${process.env.PUBLIC_URL}/`} />;
    }

    return <Outlet/>;
}

export default OnlyGuestGuard;