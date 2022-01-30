import Header from "components/containers/auth/Header";
import Body from "components/containers/auth/Body";
import Footer from "components/containers/auth/Footer";
import { Outlet } from "react-router-dom";

function AuthLayout() {

    return (
        <>
            <div className={'auth-container'}>
                <Header/>
                <Body>
                    <Outlet/>
                </Body>
            </div>
            <Footer/>
        </>

    );
}

export default AuthLayout;