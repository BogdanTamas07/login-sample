import { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions";
import { FormHandler, ResetPassState } from "../../types/index";
import { resetPasswordValidationSchema } from "../../schemas/index";

export const ResetPassword: FC = () => {
  const { email, token } = useParams();
  const [{ message, loading }, setState] = useState<FormHandler>({
    loading: false,
    message: "",
  });

  const dispatch = useDispatch();

  const handleResetPassword = (data: ResetPassState) => {
    if (!token) {
      setState((state: any) => ({
        ...state,
        message: "Invalid reset password token",
      }));
      return;
    } //@ts-ignore

    dispatch(resetPassword({ ...data, email, token }));
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
          initialValues={{ password: "", passwordConfirmation: "" }}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={handleResetPassword}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger mt-1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation">
                Password Confirmation
              </label>
              <Field
                name="passwordConfirmation"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="passwordConfirmation"
                component="div"
                className="alert alert-danger mt-1"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Reset Password</span>
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
