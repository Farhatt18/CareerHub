import { useDispatch } from "react-redux";
// import { deletePost } from "../../store/reducers/post";
import "./PostIndexItem.css";
import PostDropDown from "./PostDropDown";
const PostIndexItem = ({ post }) => {
  // const dispatch = useDispatch();

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deletePost(post.id));
  // };

  return (
    <div className="postIndexItem">
      <div className="eachPost">
        <div className="postHeader">
          <div className="icon">
            <i className="fa-solid fa-user-circle fa-3x" />
            <span>Name</span>
          </div>
          <PostDropDown postId={post.id} />
        </div>
        <p>{post.body}</p>
        {/* <img src={post.photoUrl} alt="random" /> */}
        {/* <button onClick={handleDelete}>X</button> */}
      </div>
    </div>
  );
};
export default PostIndexItem;
