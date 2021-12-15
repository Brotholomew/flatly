import React from "react";
import { useField, FieldConfig } from 'formik';
import Skeleton from "react-loading-skeleton";

interface ItemInterface {
    label: string,
    props: FieldConfig,
    id: string,
    loading?: boolean
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

    return {
        TextInput,
        TextArea
    }
};

export default FormItem;