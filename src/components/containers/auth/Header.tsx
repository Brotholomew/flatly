import {Link} from "react-router-dom";

function Header() {

    return (
        <>
            <h3>This is auth header</h3>
            <Link to="/">Home</Link>
        </>
    );
}

export default Header;