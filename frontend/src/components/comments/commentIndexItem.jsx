import "./commentIndexItem.css";

import CommentDropDown from "./commentDropDown";
const CommentIndexItem = ({ comment, postUserId }) => {
  return (
    <div className="commentWrapper">
      <>
        <i className="fa-solid fa-user-circle fa-2x" />
        <div className="commentBox">
          <CommentDropDown
            key={comment.id}
            comment={comment}
            postUserId={postUserId}
            parentCommentId={comment.parent_comment_id}
          />
          <div>
            {comment.user
              ? `${comment.user.fname} ${comment.user.lname}`
              : "Unknown User"}
          </div>
          <p>{comment.body}</p>
        </div>
      </>
    </div>
  );
};
export default CommentIndexItem;
