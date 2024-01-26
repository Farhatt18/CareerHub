import csrfFetch from "../csrf";
import { createSelector } from "reselect";
const RECEIVE_EXPERIENCES = "experiences/RECEIVE_EXPERIENCES";
const RECEIVE_EXPERIENCE = "experiences/RECEIVE_EXPERIENCE";
const REMOVE_EXPERIENCE = "experiences/REMOVE_EXPERIENCE";

export const receiveExperiences = (experiences) => ({
  type: RECEIVE_EXPERIENCES,
  experiences,
});

export const receiveExperience = (experience) => ({
  type: RECEIVE_EXPERIENCE,
  experience,
});

export const removeExperience = (experienceId) => ({
  type: REMOVE_EXPERIENCE,
  experienceId,
});

const selectExperiencesState = (state) => state.experiences;

// Use createSelector to create a memoized selector that transforms the posts
export const selectExperiences = createSelector(
  [selectExperiencesState],
  (experiences) => Object.values(experiences)
);

export const fetchExperiences = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/experiences?user_id=${userId}`);
  if (res.ok) {
    const { experiences } = await res.json();
    console.log(experiences);
    dispatch(receiveExperiences(experiences));
  }
};

export const createExperience = (experience) => async (dispatch) => {
  const res = await csrfFetch(`/api/experiences`, {
    method: "post",
    body: JSON.stringify(experience),
  });

  if (res.ok) {
    const { experience } = await res.json();
    dispatch(receiveExperience(experience));
  }
};

export const updateExperience = (experience) => async (dispatch) => {
  const res = await csrfFetch(`/api/experiences/${experience.id}`, {
    method: "put",
    body: JSON.stringify(experience),
  });

  if (res.ok) {
    const experience = await res.json();
    dispatch(receiveExperience(experience));
  }
};

export const deleteExperience = (experienceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/experiences/${experienceId}`, {
    method: "delete",
  });

  if (res.ok) {
    dispatch(removeExperience(experienceId));
  }
};
const initialState = {
  experiences: [],
};

const experienceReducers = (state = initialState, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_EXPERIENCES:
      return { ...action.experiences };
    case RECEIVE_EXPERIENCE:
      return { ...nextState, [action.experience.id]: action.experience };
    case REMOVE_EXPERIENCE:
      delete nextState[action.experienceId];
      return nextState;
    default:
      return state;
  }
};
export default experienceReducers;
