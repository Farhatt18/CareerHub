import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/reducers/post";
import "./PostDropDown.css";
import PostModal from "./PostModal";
const PostDropDown = ({ postId }) => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const handleDropDownToggle = () => [setShowDropDown(!showDropDown)];

  const handleDelete = () => {
    dispatch(deletePost(postId));
    setShowDropDown(false);
  };

  const handleEdit = () => {
    // dispatch(updatePost(postId));
    <PostModal />;
    setShowDropDown(false);
  };

  return (
    <div className="postDropDown">
      <button className="dropDownBtn" onClick={handleDropDownToggle}>
        ...
      </button>
      {showDropDown && (
        <div className="dropDownOptions">
          <button onClick={handleEdit}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      )}
    </div>
  );
};

export default PostDropDown;
