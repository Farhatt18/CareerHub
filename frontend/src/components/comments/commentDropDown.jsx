import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../store/reducers/comment";
import edit from "../../assets/image/pencil.png";
import trash from "../../assets/image/trash.png";
import "./commentDropDown.css";
const CommentDropDown = ({ comment, commentUserId, commentId, postUserId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const [isEditing, setIsEditing] = useState(false);

  const handleDropDownToggle = () => {
    setShowDropDown(!showDropDown);
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(commentId));
    setShowDropDown(false);
  };
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const updatedComment = { ...comment, body: editedComment };
    await dispatch(updateComment(updatedComment));
    setIsEditing(false);
  };
  const handleCloseBtn = () => {
    setShowDropDown(false);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setShowDropDown(false);
  };

  return (
    <div className="commentDropDown">
      <button className="dropDown" onClick={handleDropDownToggle}>
        ...
      </button>
      {showDropDown && (
        <div className="commentDropDownOptions">
          <>
            <div className="editBox">
              <button onClick={handleEditButtonClick}>
                <img src={edit} width={20} height={20} alt="pencil" />
                Edit Comment
              </button>
            </div>
            <div className="deleteBox">
              <button onClick={handleDelete}>
                <img src={trash} width={20} height={20} alt="trash" /> Delete
                Comment
              </button>
            </div>
          </>
        </div>
      )}
      {isEditing && (
        <div className="editCommentWrapper">
          <form>
            <input
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div>
              <button onClick={(e) => handleUpdateComment(e)}>
                Save Changes
              </button>
              <button onClick={handleCloseBtn}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentDropDown;
