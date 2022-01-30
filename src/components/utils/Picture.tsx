import {Image} from "common/types/Flat";
import getApiUrl from "common/helpers/apiUrl";

export interface PictureProps {
    image?: Image,
}

const Picture = (props: PictureProps) => {
    const isValidHttpUrl = (path: string) => {
        let url;

        try {
            url = new URL(path);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }


    const getSrc = () => props.image
        ? (isValidHttpUrl(props.image?.path ?? '') ? props.image?.path : `${getApiUrl()}${props.image?.path}`)
        : `${process.env.PUBLIC_URL}/imagePlaceholder.png`;

    return(
        <div className={'picture-container'}>
            <img className={"picture"} src={getSrc()} alt="Flat"/>
        </div>
    );
}

export default Picture;