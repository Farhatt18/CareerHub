import { useSelector } from "react-redux";
import "./PostIndexItem.css";
import PostDropDown from "./PostDropDown";
import CreateComment from "../comments/createComment";

const PostIndexItem = ({ post, postUserId }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="postIndexItem">
      <div className="eachPost">
        <div className="postHeader">
          <div className="icon">
            <i className="fa-solid fa-user-circle fa-3x" />
            <span>{`${post.author.fname} ${post.author.lname}`}</span>
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

        {post.photoUrl && (
          <img
            className="image"
            src={post.photoUrl}
            alt="img"
            width={563}
            height={563}
          />
        )}
        <CreateComment postId={post.id} postUserId={post.userId} />
      </div>
    </div>
  );
};

export default PostIndexItem;
