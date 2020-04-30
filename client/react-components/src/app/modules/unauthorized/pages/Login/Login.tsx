import React, { useState} from 'react'
import {Formik} from "formik";
import {Button, Input} from "@material-ui/core";
import {FormContainer, AuthInput, LoginForm} from "./styles";
import {UserLogin} from "../../models/login";
import {connect} from "react-redux";
import * as AuthActions from '../../../../redux/actions/auth.actions';
import * as LoaderActions from '../../../../redux/actions/loader.actions';
import {useHistory} from "react-router-dom";
interface Props {
    login: (value: UserLogin) => void;
    showLoader: () => void;
    hideLoader: () => void;
    isUserAuthenticated: boolean;
}
interface State {
    email: string;
    password: string;
}
const Login = (props: Props) => {
    const [userLogin, setUserLogin] = useState(new UserLogin());
    let history = useHistory();

    const loginUser = (values: UserLogin) => {
       setUserLogin(values);
       debugger
       props.showLoader();
       props.login(values);
    }
    return (
        <FormContainer>
            <Formik
                initialValues={userLogin}
                onSubmit={(values) => loginUser(values)}

            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <LoginForm>
                                <AuthInput>
                                    <Input
                                        id="email"
                                        placeholder="Email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </AuthInput>
                                <AuthInput>
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        type="text"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}
                                </AuthInput>
                                <Button type="submit" variant="contained" color="primary">
                                    Sign in
                                </Button>
                            </LoginForm>
                        </form>
                    );
                }}
            </Formik>
        </FormContainer>
    )
}

const mapDispatchToProps = {
    login: (values: UserLogin) => AuthActions.loginRequest(values),
    showLoader: () => LoaderActions.showLoader(),
    hideLoader: () => LoaderActions.hideLoader(),
};
const mapStateToProps = (state: any) => {
    return {
        isUserAuthenticated: state.authReducer.isUserAuthenticated,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)
