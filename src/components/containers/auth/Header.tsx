import {Link} from "react-router-dom";

function Header() {

    return (
        <>
            <h3>This is auth header</h3>
            <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
        </>
    );
}

export default Header;