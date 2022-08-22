import { FC } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoginState } from "../../types";
import { loginValidationSchema } from "../../schemas";
import { loginUser } from "../../redux/actions";
import { AnyAction } from "@reduxjs/toolkit";

const initialValues = { username: "", password: "" };

export const Login: FC = () => {
  const { loading, error } = useSelector((state: any) => state) ?? {};
  const { message = "" } = error ?? {};
  const dispatch = useDispatch();

  const handleLogin = (data: LoginState) => {
    dispatch(loginUser(data) as unknown as AnyAction);
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
          initialValues={initialValues as LoginState}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger mt-1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger mt-1"
              />
            </div>

            <div className="form-group d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <Link to={"/reset-password"}>
                <button className="btn btn-primary btn-block mt-3">
                  Reset password
                </button>
              </Link>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger mt-2" role="alert">
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
