import csrfFetch from "../csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";

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

const updateUser = (user) => ({
  type: UPDATE_PROFILE_PICTURE,
  user,
});

export const updateProfilePicture = (updatedUser) => async (dispatch) => {
  const userId = updatedUser.get("id");
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: "put",
    body: updatedUser,
  });

  if (res.ok) {
    const { user } = await res.json();
    dispatch(updateUser(user));
  }
};

export const updateCoverPicture = (updatedUser) => async (dispatch) => {
  const userId = updatedUser.get("id");
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: "put",
    body: updatedUser,
  });

  if (res.ok) {
    const { user } = await res.json();
    dispatch(updateUser(user));
  }
};

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
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
  const { username, email, password, fname, lname } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      fname,
      lname,
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
    case UPDATE_PROFILE_PICTURE:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
export default sessionReducer;
