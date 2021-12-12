import React from "react";
import { Formik, Form, useField, FieldConfig } from 'formik';

interface ItemInterface {
    label: string,
    props: FieldConfig,
    id: string
}

const FormItem = () => {
    const TextInput = ({ label, props, id }: ItemInterface) => {
        const [field, meta] = useField(props);
        return (
            <div className={"form-text-input"}>
                <label htmlFor={id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    const TextArea = ({ label, props, id }: ItemInterface) => {
        const [field, meta] = useField(props);
        return (
            <div className={"form-text-area-input"}>
                <label htmlFor={id || props.name}>{label}</label>
                <textarea className="text-area" {...field} {...props} />
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