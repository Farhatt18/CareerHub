// import { createSelector } from "reselect";

//Action constant
const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST";
const REMOVE_POST = "posts/REMOVE_POST";

//Action creator
export const receive_posts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receive_post = (post) => ({
  type: RECEIVE_POST,
  post,
});

export const remove_post = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const selectArray = (state) => Object.values(state.posts);
export const selectPost = (postId) => {
  return (state) => {
    state.posts[postId] ? state.posts[postId] : null;
  };
};

//thunk action
export const fetchPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receive_posts(data));
  }
};

export const fetchPost = (post) => async (dispatch) => {
  const res = await fetch(`/api/posts/${post.id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receive_posts(data));
  }
};

export const createPost = (post) => async (dispatch) => {
  const res = await fetch(`/api/posts`, {
    method: "post",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receive_post(data));
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await fetch(`/api/posts/${post.id}`, {
    method: "patch",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receive_post(data));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "delete",
  });

  if (res.ok) {
    dispatch(remove_post(postId));
  }
};

const initialState = {
  posts: {
    1: {
      id: 1,
      author_id: 1,
      content: "Excited to join the local running club!",
    },
    2: {
      id: 2,
      author_id: 2,
      content: "Just completed a thrilling mountain biking trail!",
    },
  },
};
//Reducer
const postReducers = (state = initialState, action) => {
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
