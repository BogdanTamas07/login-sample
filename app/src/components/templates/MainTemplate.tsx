import { FC, ReactNode, useEffect } from "react";
import { Link, matchRoutes, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchUser } from "redux/actions";

const protectedRoutes = [{ path: "/profile" }, { path: "/" }];

export const MainTemplate: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userInfo = null } = useSelector((state: any) => state);
  const { username } = userInfo ?? {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") ?? "null");
    if (userInfo) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storageUser, ...userInfo })
      );
    }

    if (!userInfo) {
      dispatch(fetchUser(storageUser) as unknown as AnyAction);
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    const isOnProtectedRoute = matchRoutes(protectedRoutes, location);
    if (username && !isOnProtectedRoute) {
      return navigate("/profile");
    }
  }, [navigate, username, location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
        </div>
        {username ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={handleLogout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">{children}</div>
    </div>
  );
};
