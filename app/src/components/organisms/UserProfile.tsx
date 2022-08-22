import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { itemValidationSchema } from "schemas";
import { addItem, fetchItems } from "redux/actions";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialValues = { userText: "" };

export const UserProfile: FC = () => {
  const { messagesList = [], userInfo = null } = useSelector(
    (state: any) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username = "", email = "" } = userInfo ?? {};

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "null");
    if (!user) navigate("/login");
    if (user)
      dispatch(fetchItems({ username: user.username }) as unknown as AnyAction);
  }, [navigate]);

  const handleAddItem = (data: any, { resetForm }: { resetForm: any }) => {
    dispatch(addItem({ ...data, username }) as unknown as AnyAction);
    resetForm();
  };

  return (
    <div className="col-md-12">
      <div className="card card-container align-items-center">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h6>{username}</h6>
        <p>{email}</p>
      </div>
      <div className="card card-container align-items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={itemValidationSchema}
          onSubmit={handleAddItem}
        >
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="userText">Message</label>
                <Field name="userText" type="text" className="form-control" />
                <ErrorMessage
                  name="userText"
                  component="div"
                  className="alert alert-danger mt-1"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Add item
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="card card-container align-items-center">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Text</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {messagesList.map(
              ({ id = "", username = "", userText = "", createdAt = "" }) => (
                <tr key={id.toString()}>
                  <td>{username}</td>
                  <td>{userText}</td>
                  <td>{createdAt}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
