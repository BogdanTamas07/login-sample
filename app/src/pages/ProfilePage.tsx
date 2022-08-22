import { FC } from "react";
import { MainTemplate } from "../components/templates/MainTemplate";
import { UserProfile } from "../components/organisms";

export const ProfilePage: FC = () => (
  <MainTemplate>
    <UserProfile />
  </MainTemplate>
);
