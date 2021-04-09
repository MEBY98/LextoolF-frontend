import { CreateUserInput } from './../user/user.inputs';
import { apolloMutate, apolloQuery } from './../../apollo';
import {
  REGISTER_USER_MUTATION,
  RESEND_EMAIL_VERIFICARION_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
  VERIFY_EMAIL_MUTATION,
  REFRESH_TOKEN_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  VERIFY_EXISTS_PASSWORD_FORGET_MUTATION,
} from './mutations';
import { LOGIN_QUERY } from './querys';
import {
  LoginInput,
  UpdatePasswordInput,
  ResetPasswordInput,
  VerifyResetPasswordInput,
} from './inputs';
import { FetchPolicy } from '@/graphql/apolloProvider';

export class AuthService {
  static login(input: LoginInput) {
    return apolloQuery(LOGIN_QUERY, { input }, FetchPolicy.network_only);
  }

  static register(input: CreateUserInput) {
    return apolloMutate(REGISTER_USER_MUTATION, { input });
  }

  static verifyEmail(token: string) {
    return apolloMutate(VERIFY_EMAIL_MUTATION, { token });
  }

  static resendEmailVerification(email: string) {
    return apolloMutate(RESEND_EMAIL_VERIFICARION_MUTATION, { email });
  }

  static changePassword(input: UpdatePasswordInput) {
    return apolloMutate(CHANGE_PASSWORD_MUTATION, { input });
  }

  static forgotPassword(email: string) {
    return apolloMutate(FORGOT_PASSWORD_MUTATION, { email });
  }

  static resetPassword(input: ResetPasswordInput) {
    return apolloMutate(RESET_PASSWORD_MUTATION, { input });
  }

  static refreshToken() {
    return apolloMutate(REFRESH_TOKEN_MUTATION);
  }

  static verifyExistsPasswordForget(input: VerifyResetPasswordInput) {
    return apolloMutate(VERIFY_EXISTS_PASSWORD_FORGET_MUTATION, {
      input,
    });
  }
}
