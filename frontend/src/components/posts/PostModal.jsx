import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import "./PostModal.css";
import * as postActions from "../../store/reducers/post";
import person from "../../assets/image/ghostPerson.svg";
import photo from "../../assets/image/photo.png";

const PostModal = ({ userName }) => {
  const [photoFile, setPhotoFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post[body]", body);
    if (photoFile) {
      formData.append("post[photo]", photoFile);
    }

    dispatch(postActions.createPost(formData));
    dispatch(modalActions.hideModal());
    setBody("");
    setPhotoFile(null);
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };
  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  return (
    <Modal>
      <div className="postModalWrapper">
        <h2 className="sharedHeader">
          <button className="btnShared">
            <div className="icon">
              <img
                src={user.photoUrl || person}
                width={50}
                height={50}
                className="img"
              />
              <span>{userName}</span>
            </div>
          </button>
          <button className="closeBtn" onClick={handleCloseBtn}>
            X
          </button>
        </h2>
        <div className="sharedBody">
          <form onSubmit={handleSubmit}>
            <div className="textImg">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="What's on your mind?"
                maxLength={3000}
              />

              {photoFile && (
                <div className="selectedImage">
                  <img
                    src={URL.createObjectURL(photoFile)}
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
              <input id="file-input" type="file" onChange={handleFile} />
            </div>
            <div className="footer">
              <button className={body ? "active" : "postBtn"}>Post</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
