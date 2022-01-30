import React, {useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import Validator from "../../val/Validator";
import FormItem from "../utils/FormItem";
import Button from "components/utils/Button";
import {Flat, Image} from "common/types/Flat";
import {Facility} from "../../common/types/Facility";
import assert from "assert";
import Uploader from "components/utils/Uploader";

interface FlatFormInterface {
    updateFlatCallback: (flat: Flat) => void,
    initialState: Flat,
    loading: boolean,
    fetchFacility: (name: string) => Promise<any>,
    addFacility: (facility: Facility) => Promise<any>
}

const FlatForm = (props: FlatFormInterface) => {
    const { flat } = Validator();
    const { TextInput, TextArea, TagArea } = FormItem();
    const loading = props.initialState === undefined;

    const [images, setImages] = useState<Image[]>([]);
    const [internalFacilities, updateInternalFacilities] = useState<Facility[]>(props.initialState.facilities);
    const [tagEditorFocused, setTagEditorFocused] = useState<boolean>(true)

    useEffect(() => {
        if (props.initialState.facilities.length > 0)
            updateInternalFacilities(props.initialState.facilities);
    }, [props.initialState.facilities])

    const addFacility = (name: string) => {
        return new Promise<any>((resolve, reject) => {
            if (internalFacilities.find((f: Facility) => f.name === name)) {
                reject("facility already added");
                return;
            }

            props.fetchFacility(name)
                .then((res: any) => {
                    // facility exists in the database
                    addFacilityInternal(res);
                    resolve(res);
                })
                .catch(() => {
                    // facility does not exist in the database
                    props.addFacility({id: 0, name: name})
                        .then((res: any) => {
                            addFacilityInternal(res)
                            resolve(res);
                        })
                        .catch(e => {
                            console.error(e)
                            reject(e);
                        })
                })
        })
    }

    const deleteFacility = (facility: Facility) => {
        updateInternalFacilities([...internalFacilities].filter((f: Facility) => f.id !== facility.id));
    }

    const addFacilityInternal = (facility: Facility) => {
        updateInternalFacilities([...internalFacilities, facility]);
    }

    const onImagesChange = (images: Image[]) => {
        setImages(images);
    }

    useEffect(() => setImages(props.initialState?.images ?? []), [props.initialState?.images]);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: props.initialState?.name,
                rooms: props.initialState?.rooms,
                area: props.initialState?.area,
                description: props.initialState?.description,

                /* flat address validation */
                streetName: props.initialState?.address.streetName,
                houseNumber: props.initialState?.address.houseNumber,
                localNumber: props.initialState?.address.localNumber,
                postalCode: props.initialState?.address.postalCode,
                city: props.initialState?.address.city,
            }}
            validationSchema={flat}
            onSubmit={(values, { setSubmitting }) => {
                /* validation will not allow below values to be undefined */
                assert(
                    values.name
                    && values.description
                    && values.streetName
                    && values.houseNumber
                    && values.postalCode
                    && values.city
                );

                props.updateFlatCallback({
                    id: props.initialState?.id,
                    name: values.name,
                    rooms: values.rooms,
                    area: values.area,
                    facilities: internalFacilities,
                    description: values.description,
                    active: props.initialState?.active,
                    images: images,

                    address: {
                        streetName: values.streetName,
                        houseNumber: values.houseNumber,
                        localNumber: values.localNumber,
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
                <TagArea   label={'Facilities'}
                           props={{name: 'facilities', type: 'text'}}
                           id={'facilities'}
                           loading={loading}
                           tagEditorInterface={{
                               addTag: addFacility,
                               deleteTag: deleteFacility,
                               initialTags: internalFacilities,
                               focused: tagEditorFocused,
                               setFocused: setTagEditorFocused
                           }}
                />

                <TextInput label={'Street Name'} props={{name: 'streetName', type: 'text'}} id={'streetName'} loading={loading}/>
                <TextInput label={'House Number'} props={{name: 'houseNumber', type: 'text'}} id={'houseNumber'} loading={loading}/>
                <TextInput label={'Local Number'} props={{name: 'localNumber', type: 'text'}} id={'localNumber'} loading={loading}/>
                <TextInput label={'Postal Code'} props={{name: 'postalCode', type: 'text'}} id={'postalCode'} loading={loading}/>
                <TextInput label={'City'} props={{name: 'city', type: 'text'}} id={'city'} loading={loading}/>
                <TextArea label={'Description'} props={{name: 'description'}} id={'description'} loading={loading}/>

                { /* TODO Add images and missing property fields */ }

                <Uploader defaultImages={props.initialState?.images ?? []} onChange={onImagesChange}/>

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