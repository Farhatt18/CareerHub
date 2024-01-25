import { useState } from "react";

import { useDispatch } from "react-redux";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import "./PostModal.css";
import * as postActions from "../../store/reducers/post";
import person from "../../assets/image/ghostPerson.svg";

const PostModal = ({ userName }) => {
  const [photoFile, setPhotoFile] = useState(null);
  const dispatch = useDispatch();
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
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };
  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  // console.log(newPost);
  return (
    <Modal>
      <div className="postModalWrapper">
        <h2 className="sharedHeader">
          <button className="btnShared">
            <div className="icon">
              <img src={person} width={50} height={50} className="img" />
              <span>{userName}</span>
            </div>
          </button>
          <button className="closeBtn" onClick={handleCloseBtn}>
            X
          </button>
        </h2>
        <div className="sharedBody">
          <form onSubmit={handleSubmit}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={3000}
            />
            <input type="file" onChange={handleFile} />

            <div className="footer">
              <button className={body ? "active" : ""}>Post</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
