const CommentIndexItem = ({ comment }) => {
  return (
    <div className="commentWrapper">
      <p>{comment.body}</p>
    </div>
  );
};
export default CommentIndexItem;
