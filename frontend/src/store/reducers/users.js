import csrfFetch from "../csrf";

const RECIEVE_USERS = "RECIEVE_USERS";

const receiveUsers = (users) => ({
  type: RECIEVE_USERS,
  users,
});

export const fetchUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveUsers(data));
  }
  return res;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_USERS:
      return { ...state, ...action.users };
    default:
      return state;
  }
};

export default usersReducer;
