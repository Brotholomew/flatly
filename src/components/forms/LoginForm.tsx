import React from 'react';
import { Formik, Form } from 'formik';
import Validator from "../../val/Validator";
import FormItem from "../utils/FormItem";
import Button from "components/utils/Button";

interface LoginFormInterface {
    handleLoginCallback: (email: string, password: string) => void,
    isLoading: boolean
}

const LoginForm = (props: LoginFormInterface) => {
    const { login } = Validator();
    const { TextInput } = FormItem();

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={login}
            onSubmit={(values, { setSubmitting }) => {
                props.handleLoginCallback(values.email, values.password);
                setSubmitting(false);
                values.password = '';
            }}
        >
            <Form className={"form login"}>
                <TextInput label={'E-Mail:'} props={{name: 'email', type: 'text'}} id={'email'} />
                <TextInput label={'Password'} props={{name: 'password', type: 'password'}} id={'password'} />

                <Button
                    htmlType={'submit'}
                    icon="sign-in-alt"
                    loading={props.isLoading}
                >
                    Login
                </Button>
            </Form>
        </Formik>
    );
}

export default LoginForm;