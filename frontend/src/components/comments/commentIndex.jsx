import { useState } from "react";
import CommentIndexItem from "./commentIndexItem";
import "./commentIndexItem.css";
const CommentsIndex = ({ postUserId, comments }) => {
  const commentsObject = comments || {};
  const [visibleComments, setVisibleComments] = useState(3);

  const loadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };

  return (
    <div className="allCommentContainer">
      <ul>
        {Object.values(commentsObject)
          .reverse()
          .slice(0, visibleComments)
          .map((comment) => (
            <CommentIndexItem
              key={`${comment.id}-${comment.user_id}`}
              comment={comment}
              postUserId={postUserId}
            />
          ))}
      </ul>
      {visibleComments < Object.values(commentsObject).length && (
        <button onClick={loadMoreComments} className="loadBtn">
          Load more Comments
        </button>
      )}
    </div>
  );
};

export default CommentsIndex;
