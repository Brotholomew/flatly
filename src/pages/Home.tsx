import useAuth from "modules/useAuth";
import {Link} from "react-router-dom";

function Home() {
    const { logout } = useAuth();

    return (
        <div>
            <h3>Home page</h3>
            <Link to="/flats">Flats</Link>
            <button onClick={() => logout()}>Log out</button>
        </div>
    );
}

export default Home;