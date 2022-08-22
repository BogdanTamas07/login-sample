export type FormHandler = {
  message: string;
  loading?: boolean;
  successful?: boolean;
};

export type LoginState = {
  username: string;
  password: string;
};

export type RegisterState = {
  username: string;
  email: string;
  password: string;
};

export type ResetPassState = {
  email?: string;
  password: string;
  passwordConfirmation: string;
};

export type ForgotPassState = {
  email: string;
};

export type ProfileState =  {
  userData: IUser
}

export default interface IUser {
  id?: any | null;
  username?: string | null;
  email?: string;
  password?: string;
}
