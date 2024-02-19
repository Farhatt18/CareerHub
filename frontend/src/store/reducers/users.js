import csrfFetch from "../csrf";

const RECIEVE_USERS = "RECIEVE_USERS";
const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = (users) => ({
  type: RECIEVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const fetchAllUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveUsers(data));
  }
  return res;
};

export const fetchuser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveUser(data));
  }
};

const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECIEVE_USERS:
      return { ...nextState, ...action.users };
    case RECEIVE_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
