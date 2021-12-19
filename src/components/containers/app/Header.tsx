import {Link} from "react-router-dom";

function Header() {

    return (
       <>
           <h3>This is app header</h3>
           <Link to={`${process.env.PUBLIC_URL}/auth/login`}>Login</Link>
       </>
    );
}

export default Header;