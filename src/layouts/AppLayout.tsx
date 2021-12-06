import Header from "components/containers/app/Header";
import Body from "components/containers/app/Body";
import React from "react";
import Footer from "components/containers/app/Footer";
import { Outlet } from "react-router-dom";


function AppLayout() {

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

export default AppLayout;