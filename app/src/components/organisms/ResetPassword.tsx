import { FC } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions";
import { ResetPassState } from "../../types/index";
import { resetPasswordValidationSchema } from "../../schemas/index";
import { AnyAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const ResetPassword: FC = () => {
  const { email = "", token = "" } = useParams();
  const { loading, error = null } = useSelector((state: any) => state);
  const { message = "" } = error ?? {};
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleResetPassword = (data: ResetPassState) => {
    if (token) {
      const tokens: any[] = JSON.parse(
        localStorage.getItem("tokens") ?? "null"
      );
      if (tokens) {
        if (tokens.includes(token)) {
          return navigate("/reset-password");
        }
        localStorage.setItem("tokens", JSON.stringify([...tokens, token]));
      } else localStorage.setItem("tokens", JSON.stringify([token]));
    }
    dispatch(resetPassword({ ...data, email, token }) as unknown as AnyAction);
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
