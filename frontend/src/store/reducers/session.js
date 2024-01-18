import csrfFetch from "../csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user));
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  sessionStorage.setItem("currentUser", JSON.stringify(data.user));
  dispatch(setUser(data.user));
  return response;
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  sessionStorage.setItem("currentUser", JSON.stringify(null));
  dispatch(removeUser());
  return response;
};

const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
const initialUser = storedUser ? storedUser : null;
const initialState = { user: initialUser };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
export default sessionReducer;
