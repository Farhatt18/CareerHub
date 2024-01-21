import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./PostIndexItem.css";
import PostDropDown from "./PostDropDown";
import { updatePost } from "../../store/reducers/post.js";
// import Modal from "../Modal/modal.jsx";

const PostIndexItem = ({ post }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedBody, setEditedBody] = useState(post.body);

  // const handleUpdatePost = async () => {
  //   const updatedPost = { ...post, body: editedBody };
  //   await dispatch(updatePost(updatedPost));

  //   setIsEditing(false);
  // };

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
              {/* {isEditing ? (
                <>
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    maxLength={3000}
                  />
                  <button onClick={handleUpdatePost}>Save</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )} */}
            </div>
          )}
        </div>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostIndexItem;
