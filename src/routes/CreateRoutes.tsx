import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Home from "pages/Home";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/Auth/Login";
import OnlyGuestGuard from "routes/guards/OnlyGuestGuard";
import AuthGuard from "routes/guards/AuthGuard";
import FlatsList from "pages/Flats/FlatsList";
import FlatDetails from "pages/Flats/FlatDetails";
import FlatEditor from "pages/Flats/FlatEditor";

function CreateRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route element={<AuthGuard/>}>
              <Route path="" element={<Home/>}/>
              <Route path="flats" element={<FlatsList/>}/>
              <Route path="flats/:id/details" element={<FlatDetails/>}/>
              <Route path="flats/:id/edit" element={<FlatEditor mode={'edit'}/>}/>
              <Route path="flats/add" element={<FlatEditor mode={'add'}/>}/>
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