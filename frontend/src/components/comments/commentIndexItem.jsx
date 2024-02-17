import "./commentIndexItem.css";
import { useEffect, useState } from "react";

import CommentDropDown from "./commentDropDown";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../store/reducers/comment";
import person from "../../assets/image/ghostPerson.svg";
const CommentIndexItem = ({ comment, postUserId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [userName, setUserName] = useState("Unknown User");
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const [isTyping, setIsTyping] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    if (comment.user) {
      setUserName(`${comment.user.fname} ${comment.user.lname}`);
    }
  }, [comment.user]);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const updatedComment = { ...comment, body: editedComment };
    await dispatch(updateComment(updatedComment));
    setIsEditing(false);
    setShowBtn(true);
  };
  const handleCloseBtn = () => {
    setIsEditing(false);
    setEditedComment(comment.body);
    setIsTyping(false);
    setShowBtn(true);
  };

  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
    setIsTyping(true);
  };

  // console.log("commentUsername", comment.user?.fname, comment.user?.lname);
  return (
    <div className="commentWrapper">
      <>
        {/* <i className="fa-solid fa-user-circle fa-2x" /> */}
        <img src={user.photoUrl || person} width={30} height={30} />
        <div className="commentBox">
          <CommentDropDown
            key={comment.id}
            comment={comment}
            postUserId={postUserId}
            parentCommentId={comment.parent_comment_id}
            onEdit={setIsEditing}
            showBtn={showBtn}
            setShowBtn={setShowBtn}
          />
          <div className="commenter">
            <span>{userName}</span>
          </div>
          {isEditing ? (
            <div className="editCommentWrapper">
              <form>
                <input value={editedComment} onChange={handleInputChange} />
                <div className="btnToChange">
                  <button
                    onClick={(e) => handleUpdateComment(e)}
                    className={isTyping ? "active" : "save"}
                    disabled={!isTyping}
                  >
                    Save Changes
                  </button>
                  <button onClick={handleCloseBtn} className="cancel">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>{comment.body}</p>
          )}
        </div>
      </>
    </div>
  );
};
export default CommentIndexItem;
