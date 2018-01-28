import { SET_MEMBER_ID } from './actions';

const initialState = {
  memberID: 0,
};

export const landing = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER_ID: {
      return {
        ...state,
        memberID: action.payload.memberID || 0,
      };
    }
    default:
      return state;
  }
}
