import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/reducers/post";
import "./PostDropDown.css";
import PostModal from "./PostModal";
import * as modalActions from "../../store/reducers/modals";

const PostDropDown = ({ postId, postUserId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const handleDropDownToggle = () => [setShowDropDown(!showDropDown)];
  const modalType = useSelector((state) => state.modals.type === "SHOW_MODAL");

  const handleDelete = () => {
    if (sessionUser && sessionUser.id === postUserId) {
      dispatch(deletePost(postId));
      setShowDropDown(false);
    }
  };

  const handleEdit = () => {
    // dispatch(updatePost(postId));
    if (sessionUser.id === postUserId) {
      dispatch(modalActions.showModal("SHOW_MODAL", { postId }));
      setShowDropDown(false);
    }
  };

  return (
    <div className="postDropDown">
      <button className="dropDownBtn" onClick={handleDropDownToggle}>
        ...
      </button>
      {showDropDown && (
        <div className="dropDownOptions">
          {sessionUser && sessionUser.id === postUserId && (
            <>
              <button onClick={handleEdit}>Edit Post</button>
              {modalType && (
                <PostModal userName={sessionUser.userName} postId={postId} />
              )}

              <button onClick={handleDelete}>Delete Post</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDropDown;
