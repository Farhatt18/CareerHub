import "./commentIndexItem.css";
import { useEffect, useState } from "react";

import CommentDropDown from "./commentDropDown";

const CommentIndexItem = ({ comment, postUserId }) => {
  const [userName, setUserName] = useState("Unknown User");

  useEffect(() => {
    if (comment.user) {
      setUserName(`${comment.user.fname} ${comment.user.lname}`);
    }
  }, [comment.user]);

  console.log("commentUsername", comment.user?.fname, comment.user?.lname);
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
          <div>{userName}</div>
          <p>{comment.body}</p>
        </div>
      </>
    </div>
  );
};
export default CommentIndexItem;
