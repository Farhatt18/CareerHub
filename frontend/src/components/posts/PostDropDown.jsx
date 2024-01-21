import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../store/reducers/post";
import "./PostDropDown.css";
// import PostModal from "./PostModal";
import Modal from "../Modal/modal";
import * as modalActions from "../../store/reducers/modals";

const PostDropDown = ({ post, postId, postUserId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleDropDownToggle = () => {
    setShowDropDown(!showDropDown);
  }; // const modalType = useSelector((state) => state.modals.type === "SHOW_MODAL");

  const handleDelete = () => {
    if (sessionUser && sessionUser.id === postUserId) {
      dispatch(deletePost(postId));
      setShowDropDown(false);
    }
  };

  // const handleEdit = () => {
  //   // dispatch(updatePost(postId));
  //   if (sessionUser.id === postUserId) {
  //     dispatch(modalActions.showModal("SHOW_MODAL", { postId }));
  //     setShowDropDown(false);
  //   }
  // };

  const handleUpdatePost = async () => {
    const updatedPost = { ...post, body: editedBody };
    await dispatch(updatePost(updatedPost));
    setIsEditing(false);
  };
  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
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
              <button onClick={() => setIsEditing(true)}>Edit Post</button>
              {isEditing && (
                <Modal>
                  <form>
                    <textarea
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      maxLength={3000}
                    />
                    <button onClick={handleUpdatePost}>Save</button>
                  </form>
                </Modal>
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
