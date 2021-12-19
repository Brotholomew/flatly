import {Navigate, Outlet} from "react-router-dom";
import useAuth from "modules/useAuth";
import useNotification from "modules/useNotification";

function AuthGuard() {
    const { isLoggedIn } = useAuth();
    const { error } = useNotification();

    if (!isLoggedIn) {
        error({ title: 'You are not authenticated!' });
        return <Navigate to={`${process.env.PUBLIC_URL}/auth/login`} />;
    }

    return <Outlet/>;
}

export default AuthGuard;