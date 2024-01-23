const CommentIndexItem = ({ comment }) => {
  return (
    <div className="commentWrapper">
      <p>{comment.body}</p>
      {/* <p>{comment.user.username}</p> */}
    </div>
  );
};
export default CommentIndexItem;
