import { FC } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";

import { RegisterState } from "../../types";
import { registrationValidationSchema } from "../../schemas";
import { registerUser } from "../../redux/actions";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

export const Register: FC = () => {
  const { loading, error } = useSelector((state: any) => state);
  const { message = "" } = error ?? {};
  const dispatch = useDispatch();

  const handleRegister = (data: RegisterState) => {
    dispatch(registerUser(data) as unknown as AnyAction);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Username </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Sign Up
                  </button>
                </div>
              </div>
            }

            {message && (
              <div className="form-group">
                <div
                  className={
                    // successful
                    //   ? "alert alert-success"
                    "alert alert-danger mt-1"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};
