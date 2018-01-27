export const SET_MEMBER_ID = 'SET_MEMBER_ID';

export const setMemberID = memberID => ({
  type: SET_MEMBER_ID,
  payload: { memberID },
});
