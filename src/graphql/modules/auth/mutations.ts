import gql from 'graphql-tag';

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser($input: CreateUserInput!) {
    registerUser(input: $input)
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const RESEND_EMAIL_VERIFICARION_MUTATION = gql`
  mutation resendEmailVerification($email: String!) {
    resendEmailVerification(email: $email)
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($input: UpdatePasswordDto!) {
    changePassword(input: $input)
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($input: ResetPasswordDto!) {
    resetPassword(input: $input)
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      refreshToken
      expiresIn
    }
  }
`;
export const VERIFY_EXISTS_PASSWORD_FORGET_MUTATION = gql`
  mutation verifyExistsPasswordForget($input: VerifyTokenPasswordDto!) {
    verifyExistsPasswordForget(input: $input)
  }
`;
