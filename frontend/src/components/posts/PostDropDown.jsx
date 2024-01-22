import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../store/reducers/post";
import "./PostDropDown.css";
import edit from "../../assets/image/pencil.png";
import trash from "../../assets/image/trash.png";
import Modal from "../Modal/modal";

const PostDropDown = ({ post, postId, postUserId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleDropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };
  const handleDelete = () => {
    if (sessionUser && sessionUser.id === postUserId) {
      dispatch(deletePost(postId));
      setShowDropDown(false);
    }
  };

  const handleUpdatePost = async () => {
    const updatedPost = { ...post, body: editedBody };
    await dispatch(updatePost(updatedPost));
    setIsEditing(false);
  };
  const handleCloseBtn = () => {
    setShowDropDown(false);
    setIsEditing(false);
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
              <div className="editBox">
                <button onClick={() => setIsEditing(true)}>
                  <img src={edit} width={20} height={20} alt="pencil" />
                  Edit Post
                </button>
              </div>
              {isEditing && (
                <Modal>
                  <div className="postEditWrapper">
                    <h2 className="editSharedHeader">
                      <button className="btnShared">
                        <div className="icon">
                          <i className="fa-solid fa-user-circle fa-3x" />
                          <span>{sessionUser.username}</span>
                        </div>
                      </button>
                      <button className="postClose" onClick={handleCloseBtn}>
                        X
                      </button>
                    </h2>
                    <div className="editSharedBody">
                      <form>
                        <textarea
                          value={editedBody}
                          onChange={(e) => setEditedBody(e.target.value)}
                          maxLength={3000}
                        />
                        <div className="editFooter">
                          <button
                            onClick={handleUpdatePost}
                            className={editedBody ? "active" : ""}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal>
              )}
              <div className="deleteBox">
                <button onClick={handleDelete}>
                  {" "}
                  <img src={trash} width={20} height={20} alt="trash" /> Delete
                  Post
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDropDown;
