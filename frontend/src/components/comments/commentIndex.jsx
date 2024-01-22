import { useSelector } from "react-redux";
import CommentIndexItem from "./commentIndexItem";

const CommentsIndex = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <div className="allCommentContainer">
      <ul>
        {comments.map((comment) => {
          if (comment && comment.id) {
            return <CommentIndexItem key={comment.id} comment={comment} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default CommentsIndex;
