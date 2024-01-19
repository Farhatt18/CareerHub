import { useDispatch } from "react-redux";
import { deletePost } from "../../store/reducers/post";
import "./PostIndexItem.css";
const PostIndexItem = ({ post }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(post.id));
  };

  return (
    <div className="postIndexItem">
      <div className="eachPost">
        <p>{post.body}</p>
        {/* <img src={post.photoUrl} alt="random" /> */}
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  );
};
export default PostIndexItem;
