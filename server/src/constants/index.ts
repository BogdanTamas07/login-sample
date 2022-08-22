const BCRYPT_SALT_ROUNDS = 16;

const Routes = {
  Login: "/login",
  Register: "/register",
  User: "/user",
  Items: "/items",
  ResetPassword: "/resetPassword",
  ForgotPassword: "/forgotPassword",
};

module.exports = { BCRYPT_SALT_ROUNDS, Routes };
