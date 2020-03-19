export function signInSuccess(token) {
  return {
    type: '@auth/SIGN_IN',
    payload: { token },
  };
}
