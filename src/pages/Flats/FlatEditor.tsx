import {useParams} from "react-router-dom";

function FlatEditor() {
    const { id } = useParams();

    return (
        <div>
            FlatId: { id }
        </div>
    );
}

export default FlatEditor;