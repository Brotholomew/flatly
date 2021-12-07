import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Home from "pages/Home";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/Auth/Login";
import OnlyGuestGuard from "routes/guards/OnlyGuestGuard";
import AuthGuard from "routes/guards/AuthGuard";

function CreateRoutes() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AppLayout/>}>
                  <Route element={<AuthGuard/>}>
                    <Route path="" element={<Home/>}/>
                  </Route>
              </Route>
              <Route path="/auth" element={<AuthLayout/>}>
                  <Route element={<OnlyGuestGuard/>}>
                      <Route path="login" element={<Login/>}/>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    );
}

export default CreateRoutes