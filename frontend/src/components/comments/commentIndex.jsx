import CommentIndexItem from "./commentIndexItem";

const CommentsIndex = ({ postUserId, comments }) => {
  // console.log("postUserId:", postUserId);
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
              postUserId={postUserId}
            />
          ))}
      </ul>
    </div>
  );
};

export default CommentsIndex;
