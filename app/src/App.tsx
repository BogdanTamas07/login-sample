import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  LoginPage,
  RegisterPage,
  HomePage,
  ProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "./pages";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reset-password/" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token/:email" element={<ResetPasswordPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
