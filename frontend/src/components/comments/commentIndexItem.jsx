import "./commentIndexItem.css";

import CommentDropDown from "./commentDropDown";
const CommentIndexItem = ({
  comment,
  commentId,
  commentUserId,
  postUserId,
}) => {
  return (
    <div className="commentWrapper">
      <i className="fa-solid fa-user-circle fa-2x" />
      <div className="commentBox">
        <CommentDropDown
          key={comment.id}
          comment={comment}
          commentId={commentId}
          commentUserId={commentUserId}
          postUserId={postUserId}
          parentCommentId={comment.parent_comment_id}
        />
        <div>Name</div>
        <p>{comment.body}</p>
      </div>

      {/* <p>{comment.user.username}</p> */}
    </div>
  );
};
export default CommentIndexItem;
