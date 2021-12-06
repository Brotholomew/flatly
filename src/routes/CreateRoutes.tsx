import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Home from "pages/Home";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/Auth/Login";

function CreateRoutes() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="" element={<Home/>}/>
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default CreateRoutes