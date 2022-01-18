import {useEffect, useState} from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {MAX_UPLOADER_IMAGES} from "common/constants/uploaderConstants";
import {ImageType} from "react-images-uploading/dist/typings";
import {Image} from "common/types/Flat";
import useImage from "modules/useImage";
import {convertToImageFromImageType, convertToImageTypeFromImage} from "common/helpers/imageTypeConverter";

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
                            onClick={onImageUpload}
                            {...dragProps}
                            className={"default-button default-button--blank"}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll} className={"default-button default-button--error"}>Remove all images</button>
                        {
                            loading && <span>Uploading</span>
                        }
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.dataURL} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default Uploader;