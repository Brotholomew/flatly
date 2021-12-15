import * as Yup from 'yup';

const Validator = () => {
    const login = Yup.object({
       email: Yup.string().required('Required').email('Invalid e-mail address'),
       password: Yup.string().required('Required') /* empty passwords are not permitted */
    });

    const flat = Yup.object({
        name: Yup.string().required('Required'),
        rooms: Yup.number().required('Required').min(1, 'The Flat needs to have at least one room'),
        area: Yup.number().required('Required').min(2.5, 'The Flat needs to be at least 2.5 metres squared'), /* Easter egg */
        facilities: Yup.string().required('Required'),
        description: Yup.string().required('Required'),

        /* flat address validation */
        streetName: Yup.string().required('Required'),
        houseNumber: Yup.string().required('Required'),
        postalCode: Yup.string().required('Required').matches(/^\d{2}-\d{3}$/, 'Postal code must match format: xx-xxx'),
        city: Yup.string().required('Required')
    })

    return {
        login,
        flat
    };
};

export default Validator;