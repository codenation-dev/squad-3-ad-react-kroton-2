import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  userName: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.userName = action.payload.userName;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.loading = false;
        draft.userName = null;
        break;
      }
      default:
    }
  });
}
