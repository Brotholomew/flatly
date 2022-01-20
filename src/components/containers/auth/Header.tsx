import GlobalHeader from "../../utils/GlobalHeader";

function Header() {

    return (
        <GlobalHeader extended={false} sbProps={{options: [], selectedIndex: 0}} />
    );
}

export default Header;