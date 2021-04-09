export class LoginInput {
  email: string;
  password: string;
}

export class UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export class ResetPasswordInput {
  passwordToken: string;
  email: string;
  newPassword: string;
}

export class VerifyResetPasswordInput {
  passwordToken: string;
  email: string;
}
