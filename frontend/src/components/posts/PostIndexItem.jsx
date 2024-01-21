import { useSelector } from "react-redux";
import "./PostIndexItem.css";
import PostDropDown from "./PostDropDown";

const PostIndexItem = ({ post }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="postIndexItem">
      <div className="eachPost">
        <div className="postHeader">
          <div className="icon">
            <i className="fa-solid fa-user-circle fa-3x" />
            <span>Name</span>
          </div>
          {sessionUser && sessionUser.id === post.userId && (
            <div className="postActions">
              <PostDropDown
                postId={post.id}
                postUserId={post.userId}
                post={post}
              />
            </div>
          )}
        </div>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostIndexItem;
