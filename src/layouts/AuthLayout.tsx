import Header from "components/containers/auth/Header";
import Body from "components/containers/auth/Body";
import Footer from "components/containers/auth/Footer";
import { Outlet } from "react-router-dom";

function AuthLayout() {

    return (
        <>
            <Header/>
            <Body>
                <Outlet/>
            </Body>
            <Footer/>
        </>
    );
}

export default AuthLayout;