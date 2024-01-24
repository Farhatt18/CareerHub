// import { createSelector } from "reselect";
import csrfFetch from "../csrf";

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

export const receiveComments = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments,
});

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const removeComment = (commentId, postId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId,
});

// const selectCommentsState = (state) => state.comments;

// // Use createSelector to create a memoized selector that transforms the posts
// export const selectComments = createSelector(
//   [selectCommentsState],
//   (comments) => Object.values(comments)
// );

export const fetchComments = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments?postId=${postId}`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(receiveComments(postId, comments));
  }
};

export const fetchComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`);
  if (res.ok) {
    const comment = await res.json();
    dispatch(receiveComment(comment));
  }
};

export const createComment =
  (postId, postUserId, comment, parentCommentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments`, {
      method: "post",
      body: JSON.stringify({
        post_id: postId,
        body: comment,
        parent_comment_id: parentCommentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const createdComment = await res.json();
      dispatch(receiveComment(createdComment));
    }
    return res;
  };

export const updateComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "put",
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(receiveComment(comment));
  }
  return res;
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "delete",
  });

  if (res.ok) {
    dispatch(removeComment(commentId));
  }
};

const commentReducers = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...nextState, ...action.comments };
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
