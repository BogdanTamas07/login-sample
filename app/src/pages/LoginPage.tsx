import { FC } from "react";
import { MainTemplate } from "../components/templates/MainTemplate";
import { Login } from "../components/organisms/index";

export const LoginPage: FC = () => (
  <MainTemplate>
    <Login />
  </MainTemplate>
);
