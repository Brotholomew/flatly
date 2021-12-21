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
import BookingsList from "pages/Bookings/BookingsList";

function CreateRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<AppLayout/>}>
            <Route element={<AuthGuard/>}>
              <Route path="" element={<Home/>}/>
              <Route path="flats" element={<FlatsList/>}/>
              <Route path="flats/:id/details" element={<FlatDetails/>}/>
              <Route path="flats/:id/edit" element={<FlatEditor/>}/>
              <Route path="flats/add" element={<FlatEditor/>}/>
              <Route path="bookings" element={<BookingsList/>}/>
            </Route>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/auth`} element={<AuthLayout/>}>
            <Route element={<OnlyGuestGuard/>}>
              <Route path="login" element={<Login/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default CreateRoutes