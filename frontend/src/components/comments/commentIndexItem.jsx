import "./commentIndexItem.css";

import CommentDropDown from "./commentDropDown";
const CommentIndexItem = ({ comment }) => {
  return (
    <div className="commentWrapper">
      <i className="fa-solid fa-user-circle fa-2x" />
      <div className="commentBox">
        {/* <button className="dropDown">...</button> */}
        <CommentDropDown
          key={comment.id}
          comment={comment}
          commentId={comment.id}
          commentUserId={comment.user_id}
        />
        <div>Name</div>
        <p>{comment.body}</p>
      </div>

      {/* <p>{comment.user.username}</p> */}
    </div>
  );
};
export default CommentIndexItem;
