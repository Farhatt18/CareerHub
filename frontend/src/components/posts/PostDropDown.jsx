import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../store/reducers/post";
import "./PostDropDown.css";
import edit from "../../assets/image/pencil.png";
import trash from "../../assets/image/trash.png";
import Modal from "../Modal/modal";
import person from "../../assets/image/ghostPerson.svg";
import photo from "../../assets/image/photo.png";

const PostDropDown = ({ post, postId, postUserId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);
  const [setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(post.photoUrl); // Assuming post.photoUrl is the URL of the existing image

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
    const updatedPost = { ...post, body: editedBody, photoUrl };
    await dispatch(updatePost(updatedPost));
    setIsEditing(false);
  };

  const handleCloseBtn = () => {
    setShowDropDown(false);
    setIsEditing(false);
  };

  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);

    // Convert image to Base64 data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const handleRemovePhoto = () => {
  //   setPhotoFile(null);
  //   setPhotoUrl(null);
  // };

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
                    <h2 className="sharedHeader">
                      <button className="btnShared">
                        <div className="icon">
                          <img
                            src={person}
                            width={50}
                            height={50}
                            className="img"
                          />
                          <span>{sessionUser.username}</span>
                        </div>
                      </button>
                      <button className="postClose" onClick={handleCloseBtn}>
                        X
                      </button>
                    </h2>
                    <div className="sharedBody">
                      <form>
                        <div className="textImg">
                          <textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            maxLength={3000}
                          />

                          {photoUrl && (
                            <div>
                              {/* <span onClick={handleRemovePhoto}>X</span> */}
                              <img
                                src={photoUrl}
                                alt="Selected"
                                className="selectedImg"
                              />
                            </div>
                          )}
                        </div>
                        <div className="image-upload">
                          <label htmlFor="file-input">
                            <img src={photo} className="fileImg" />
                          </label>
                          <input
                            id="file-input"
                            type="file"
                            onChange={handleFile}
                          />
                        </div>
                        <div className="editFooter">
                          <button
                            onClick={handleUpdatePost}
                            className={editedBody ? "active" : "saveBtn"}
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
