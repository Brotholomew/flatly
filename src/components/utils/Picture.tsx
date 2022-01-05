import {Image} from "common/types/Flat";
import getApiUrl from "common/helpers/apiUrl";

export interface PictureProps {
    image?: Image,
    size?: number
}

const Picture = (props: PictureProps) => {
    const size = props?.size ?? 100;

    const getSrc = () => props.image
        ? `${getApiUrl()}${props.image?.path}`
        : `${process.env.PUBLIC_URL}/imagePlaceholder.png`;

    return(
        <>
            <img src={getSrc()} style={{maxHeight: `${size}px`}} alt="Flat"/>
        </>
    );
}

export default Picture;