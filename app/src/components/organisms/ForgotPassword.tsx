import { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";

import { ForgotPassState, FormHandler } from "../../types";
import { forgotPasswordValidationSchema } from "../../schemas";
import { forgotPassword } from "../../redux/actions";

export const ForgotPassword: FC = () => {
  const [{ message }] = useState<FormHandler>({
    loading: false,
    message: "",
  });

  const dispatch = useDispatch();

  const handleEmailSent = (data: ForgotPassState) => {
    dispatch(forgotPassword(data) as unknown as AnyAction);
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
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleEmailSent}
        >
          <Form>
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
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Send password reset link
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger mt-1" role="alert">
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
