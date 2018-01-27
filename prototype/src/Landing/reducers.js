import { SET_MEMBER_ID } from './actions';

const initialState = {
  memberID: null,
};

export const landing = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER_ID: {
      return {
        ...state,
        memberID: action.payload.memberID,
      };
    }
    default:
      return state;
  }
}
