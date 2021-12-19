import {useDispatch, useSelector} from "react-redux";
import AuthService from "services/AuthService";
import useNotification from "modules/useNotification";
import {useNavigate} from "react-router-dom";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "store/modules/auth/types";

const useAuth = () => {
    const { user, isLoggedIn } = useSelector((state: any) => state.authReducers);
    const dispatch = useDispatch();
    const { success, error } = useNotification();
    const navigate = useNavigate();

    const login = (email: string, password: string) => {
        return AuthService.logIn({ email: email, password: password })
            .then((data) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data.data
                });
                success({ title: "Logged in successfully!" });
                navigate(`${process.env.PUBLIC_URL}/`);
            })
            .catch((e) => {
                console.log(e);
                dispatch({
                    type: LOGIN_FAILURE
                });
                error({ title: "Invalid credentials!" });
                throw e;
            })
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        });
        success({ title: "Logged out successfully!" });
        navigate(`${process.env.PUBLIC_URL}/auth/login`);
    }

    return {
        user,
        isLoggedIn,
        login,
        logout
    }
}

export default useAuth;