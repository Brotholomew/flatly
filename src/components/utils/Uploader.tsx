import {useEffect, useState} from "react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {MAX_UPLOADER_IMAGES} from "common/constants/uploaderConstants";
import {ImageType} from "react-images-uploading/dist/typings";
import {Image} from "common/types/Flat";
import useImage from "modules/useImage";
import {convertToImageFromImageType, convertToImageTypeFromImage} from "common/helpers/imageTypeConverter";
import Button from "./Button";
import {ButtonType} from "../../common/enums/ButtonType";
import Picture from "./Picture";
import getApiUrl from "../../common/helpers/apiUrl";

export interface UploaderProps {
    defaultImages?: Image[],
    onChange: Function
}

const Uploader = (props: UploaderProps) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(false);
    const {uploadImage}= useImage();

    useEffect(() => {
        const newImages = props.defaultImages?.map(image => convertToImageTypeFromImage(image))
            ?? [];

        setImages(newImages);
    }, [props.defaultImages])

    const onChange = async (
        imageList: ImageListType
    ) => {
        setLoading(true);
        const promises: Promise<ImageType>[] = [];

        imageList.forEach(image => promises.push(new Promise(async (resolve) => {
            if (image.imageId || !image.file) {
                return resolve(image);
            }

            const result: any = await uploadImage(image.file);
            resolve({
                ...image,
                ...convertToImageTypeFromImage(result as Image)
            });
        })));

        const newImages = await Promise.all(promises);
        setImages(newImages);

        props.onChange(
            newImages.map((image): Image => convertToImageFromImageType(image))
        );

        setLoading(false);
    };

    return(
        <div className="image-uploader">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={MAX_UPLOADER_IMAGES}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: "red" } : undefined}
                            {...dragProps}
                            className={"default-button default-button--blank"}
                            onClick={(e) => { onImageUpload(); e.preventDefault(); }}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button
                            onClick={(e) => {onImageRemoveAll(); e.preventDefault();}}
                            className={"default-button default-button--error"}
                        >
                            Remove all images
                        </button>

                        {
                            loading && <p>Uploading</p>
                        }
                        <div className={"image-item-wrapper"}>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <div className="image-item-btn-wrapper">
                                    <Button icon={'trash'} type={ButtonType.ERROR} click={() => onImageRemove(index)}/>
                                </div>
                                <Picture image={{id: image.id, path: image.dataURL?.replaceAll(`${getApiUrl()}`, "")}}/>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default Uploader;