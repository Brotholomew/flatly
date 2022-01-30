import {WithChildren} from "common/types/PropTypes";

interface BodyProps extends WithChildren {
}


function Body(props: BodyProps) {

    return (
        <main>
            { props.children }
        </main>
    );
}

export default Body;