import CommentIndexItem from "./commentIndexItem";

const CommentsIndex = ({ comments }) => {
  // console.log("postId:", postId);
  // console.log("comments:", comments);
  const commentsObject = comments || {};
  return (
    <div className="allCommentContainer">
      <ul>
        {Object.values(commentsObject).map((comment) => (
          <CommentIndexItem
            key={comment.id}
            comment={comment}
            commentUserId={comment.user_id}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsIndex;
