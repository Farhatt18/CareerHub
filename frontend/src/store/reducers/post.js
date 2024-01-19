// import { createSelector } from "reselect";
import csrfFetch from "../csrf";

//Action constant
const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST";
const REMOVE_POST = "posts/REMOVE_POST";

//Action creator
export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
});

export const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const selectArray = (state) => Object.values(state.posts);
export const selectPost = (postId) => {
  return (state) => {
    return state.posts[postId] || null;
  };
};
//thunk action
export const fetchPosts = () => async (dispatch) => {
  const res = await csrfFetch(`/api/posts`);
  if (res.ok) {
    const postsArray = await res.json();
    const postsObject = {};
    postsArray.forEach((post) => {
      postsObject[post.id] = post;
    });
    dispatch(receivePosts(postsObject));
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receivePosts(data));
  }
};

export const createPost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts`, {
    method: "post",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receivePost(data));
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: "patch",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receivePost(data));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "delete",
  });

  if (res.ok) {
    dispatch(removePost(postId));
  }
};

//Reducer
const postReducers = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      nextState[action.post.id] = action.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.postId];
      return nextState;
    default:
      return state;
  }
};

export default postReducers;
