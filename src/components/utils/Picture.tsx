import {Image} from "common/types/Flat";
import getApiUrl from "common/helpers/apiUrl";

export interface PictureProps {
    image?: Image,
}

const Picture = (props: PictureProps) => {

    const getSrc = () => props.image
        ? `${getApiUrl()}${props.image?.path}`
        : `${process.env.PUBLIC_URL}/imagePlaceholder.png`;

    return(
        <div className={'picture-container'}>
            <img className={"picture"} src={getSrc()} alt="Flat"/>
        </div>
    );
}

export default Picture;