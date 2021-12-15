import React from 'react';
import { Formik, Form } from 'formik';
import Validator from "../../val/Validator";
import FormItem from "../utils/FormItem";
import Button from "components/utils/Button";
import { Flat } from "../../common/types/Flat";
import assert from "assert";

interface FlatFormInterface {
    updateFlatCallback: (flat: Flat) => void,
    initialState?: Flat
    loading?: boolean
}

const FlatForm = (props: FlatFormInterface) => {
    const { flat } = Validator();
    const { TextInput, TextArea } = FormItem();
    const loading = props.initialState === undefined;

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: props.initialState?.name,
                rooms: props.initialState?.rooms,
                area: props.initialState?.area,
                facilities: props.initialState?.facilities?.join(','),
                description: props.initialState?.description,

                /* flat address validation */
                streetName: props.initialState?.address.streetName,
                houseNumber: props.initialState?.address.houseNumber,
                flatNumber: props.initialState?.address.flatNumber,
                postalCode: props.initialState?.address.postalCode,
                city: props.initialState?.address.city
            }}
            validationSchema={flat}
            onSubmit={(values, { setSubmitting }) => {
                /* validation will not allow below values to be undefined */
                assert(props.initialState?.id &&
                    values.name &&
                    values.facilities &&
                    values.description &&
                    values.streetName &&
                    values.houseNumber &&
                    values.postalCode &&
                    values.city);

                props.updateFlatCallback({
                    id: props.initialState?.id,
                    name: values.name,
                    rooms: values.rooms,
                    area: values.area,
                    facilities: values?.facilities?.split(','),
                    description: values.description,
                    images: [],

                    address: {
                        streetName: values.streetName,
                        houseNumber: values.houseNumber,
                        flatNumber: values.flatNumber,
                        postalCode: values.postalCode,
                        city: values.city
                    }
                });
                setSubmitting(false);
            }}
        >
            <Form>
                <TextInput label={'Name:'} props={{name: 'name', type: 'text'}} id={'name'} loading={loading}/>
                <TextInput label={'Rooms'} props={{name: 'rooms', type: 'number'}} id={'rooms'} loading={loading}/>
                <TextInput label={'Area'} props={{name: 'area', type: 'number'}} id={'area'} loading={loading}/>
                <TextInput label={'Facilities'} props={{name: 'facilities', type: 'text'}} id={'facilities'} loading={loading}/>

                <TextInput label={'Street Name'} props={{name: 'streetName', type: 'text'}} id={'streetName'} loading={loading}/>
                <TextInput label={'House Number'} props={{name: 'houseNumber', type: 'text'}} id={'houseNumber'} loading={loading}/>
                <TextInput label={'Flat Number'} props={{name: 'flatNumber', type: 'text'}} id={'flatNumber'} loading={loading}/>
                <TextInput label={'Postal Code'} props={{name: 'postalCode', type: 'text'}} id={'postalCode'} loading={loading}/>
                <TextInput label={'City'} props={{name: 'city', type: 'text'}} id={'city'} loading={loading}/>

                <TextArea label={'Description'} props={{name: 'description'}} id={'description'} loading={loading}/>

                <Button
                    htmlType={'submit'}
                    icon="save"
                    loading={props.loading}
                >
                    Save
                </Button>
            </Form>
        </Formik>
    );
}

export default FlatForm;