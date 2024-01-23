import CommentIndexItem from "./commentIndexItem";

const CommentsIndex = ({ postUserId, comments }) => {
  // console.log("postId:", postId);
  // console.log("comments:", comments);
  const commentsObject = comments || {};
  return (
    <div className="allCommentContainer">
      <ul>
        {Object.values(commentsObject)
          .reverse()
          .map((comment) => (
            <CommentIndexItem
              key={`${comment.id}-${comment.user_id}`}
              comment={comment}
              commentId={comment.id}
              commentUserId={comment.user_id}
              postUserId={postUserId}
            />
          ))}
      </ul>
    </div>
  );
};

export default CommentsIndex;
