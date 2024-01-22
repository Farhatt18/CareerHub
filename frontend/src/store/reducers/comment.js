import csrfFetch from "../csrf";

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const fetchComments = () => async (dispatch) => {
  const res = await csrfFetch(`/api/comments`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(receiveComments(comments));
  }
};

export const fetchComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`);
  if (res.ok) {
    const comment = res.json();
    dispatch(receiveComment(comment));
  }
};

export const createComment = (postId, comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments`, {
    method: "post",
    body: JSON.stringify({ postId, body: comment }),
  });

  if (res.ok) {
    const createdComment = await res.json();
    dispatch(receiveComment(createdComment));
  }
};

export const updateComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "put",
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const comment = res.json();
    dispatch(receiveComment(comment));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "delete",
  });

  if (res.ok) {
    const comment = res.json();
    dispatch(removeComment(comment));
  }
};

const commentReducers = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...action.comments };
    case RECEIVE_COMMENT:
      return { ...nextState, [action.comment.id]: action.comment };
    case REMOVE_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    default:
      return state;
  }
};

export default commentReducers;
