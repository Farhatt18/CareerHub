import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/reducers/comment";
import edit from "../../assets/image/pencil.png";
import trash from "../../assets/image/trash.png";
import "./commentDropDown.css";

const CommentDropDown = ({
  comment,
  postUserId,
  onEdit,
  showBtn,
  setShowBtn,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDownToggle = () => {
    setShowDropDown(!showDropDown);
    onEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
    setShowDropDown(false);
    setShowBtn(true);
  };

  const handleEditButtonClick = () => {
    onEdit(true);
    setShowDropDown(false);
    setShowBtn(false);
  };

  return (
    <div className="commentDropDown">
      {(userId === comment.userId || userId === postUserId) && showBtn && (
        <button className="dropDown" onClick={handleDropDownToggle}>
          ...
        </button>
      )}
      {showDropDown && (
        <div className="commentDropDownOptions">
          <>
            {userId === comment.userId && (
              <div className="editBox">
                <button onClick={handleEditButtonClick}>
                  <img src={edit} width={20} height={20} alt="pencil" />
                  Edit Comment
                </button>
              </div>
            )}
            {(userId === comment.userId || userId === postUserId) && (
              <div className="deleteBox">
                <button onClick={handleDelete}>
                  <img src={trash} width={20} height={20} alt="trash" /> Delete
                  Comment
                </button>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default CommentDropDown;
