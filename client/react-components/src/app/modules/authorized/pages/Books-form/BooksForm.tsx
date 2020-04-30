import React, {useState} from 'react'
import {FormContainer, ProductForm, ProductInput} from "./styles";
import { Formik } from "formik";
import {Button, Input} from '@material-ui/core';
import {Book} from "../../entities/book";
import {useDispatch} from "react-redux";
import {postBookRequest} from "../../../../redux/actions";
export const BooksForm = () => {
    const dispatch = useDispatch();
    const [booksFormValues, setBooksFormValues] = useState({
        title: "",
        price: 0,
        author: "",
        img: "",
        description: "",
    } as Book);
    const submitForm = (values: Book) => {
        dispatch(postBookRequest(values));
    };
    return (
        <div>
            <div>Create Book</div>
            <FormContainer>
                <Formik
                    initialValues={booksFormValues}
                    onSubmit={(values) => {
                        submitForm(values)
                    }}
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
                                <ProductForm>
                                    <ProductInput>
                                        <Input
                                            id="title"
                                            placeholder="Book title"
                                            type="text"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.title && touched.title
                                                    ? "text-input error"
                                                    : "text-input"
                                            }
                                        />
                                        {errors.title && touched.title && (
                                            <div className="input-feedback">{errors.title}</div>
                                        )}
                                    </ProductInput>
                                    <ProductInput>
                                        <Input
                                            id="price"
                                            placeholder="Product cost"
                                            type="text"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.price && touched.price
                                                    ? "text-input error"
                                                    : "text-input"
                                            }
                                        />
                                        {errors.price && touched.price && (
                                            <div className="input-feedback">{errors.price}</div>
                                        )}
                                    </ProductInput>
                                    <Button type='submit' variant="contained" color="primary">
                                        Create
                                    </Button>
                                </ProductForm>

                            </form>
                        );
                    }}
                </Formik>
            </FormContainer>
        </div>
    )
}
