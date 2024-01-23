import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../store/reducers/comment";
import edit from "../../assets/image/pencil.png";
import trash from "../../assets/image/trash.png";
const CommentDropDown = ({ comment, commentUserId, commentId }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const [isEditing, setIsEditing] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleDropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const handleDelete = () => {
    if (sessionUser && sessionUser.id === commentUserId) {
      dispatch(deleteComment(commentId));
      setShowDropDown(false);
    }
  };
  const handleUpdateComment = async () => {
    const updatedComment = { ...comment, body: editedComment };
    await dispatch(updateComment(updatedComment));
    setIsEditing(false);
  };
  const handleCloseBtn = () => {
    setShowDropDown(false);
    setIsEditing(false);
  };

  return (
    <div className="commentDropDown">
      <button className="dropDown" onClick={handleDropDownToggle}>
        ...
      </button>
      {showDropDown && (
        <div className="dropDownOptions">
          {sessionUser && sessionUser.id === commentUserId && (
            <>
              <div className="editBox">
                <button onClick={() => setIsEditing(true)}>
                  <img src={edit} width={20} height={20} alt="pencil" />
                  Edit Comment
                </button>
              </div>
              {isEditing && (
                <div className="editCommentWrapper">
                  <form>
                    <input
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <div>
                      <button onClick={handleUpdateComment}>
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div className="deleteBox">
                <button onClick={handleDelete}>
                  <img src={trash} width={20} height={20} alt="trash" /> Delete
                  Comment
                </button>
                <button onClick={handleCloseBtn}>Cancel</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentDropDown;
