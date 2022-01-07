import React from "react";
import { useField, FieldConfig } from 'formik';
import Skeleton from "react-loading-skeleton";
import TagEditor, {TagEditorInterface} from "../tags/TagEditor";
import {Facility} from "../../common/types/Facility";

interface ItemInterface {
    label: string,
    props: FieldConfig,
    id: string,
    loading?: boolean
}

interface TagAreaInterface extends ItemInterface {
    tagEditorInterface: TagEditorInterface<Facility>
}

const FormItem = () => {
    const TextInput = ({ label, props, id, loading }: ItemInterface) => {
        const [field, meta] = useField(props);
        return (
            <div className={"form-text-input"}>
                <label htmlFor={id || props.name}>{label}</label>
                {!loading
                    ?
                    <input className="text-input" {...field} {...props} />
                    :
                    <Skeleton/>
                }
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    const TextArea = ({ label, props, id, loading }: ItemInterface) => {
        const [field, meta] = useField(props);
        return (
            <div className={"form-text-area-input"}>
                <label htmlFor={id || props.name}>{label}</label>
                {!loading
                    ?
                    <textarea className="text-area" {...field} {...props} />
                    :
                    <Skeleton/>
                }
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    const TagArea = (props: TagAreaInterface) => {
        return (
            <div className={"form-text-area-input"}>
                <label htmlFor={props.id || props.props.name}>{props.label}</label>
                {!props.loading
                    ?
                    <TagEditor {...props.tagEditorInterface} />
                    :
                    <Skeleton/>
                }
            </div>
        );
    }

    return {
        TextInput,
        TextArea,
        TagArea
    }
};

export default FormItem;