import { useDispatch } from "react-redux";
import { deletePost } from "../../store/post";

const PostIndexItem = ({ post }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(post.id));
  };

  return (
    <div className="post-index-item">
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default PostIndexItem;
