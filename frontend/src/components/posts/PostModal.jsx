import { useState } from "react";

import { useDispatch } from "react-redux";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import "./PostModal.css";

const PostModal = ({ userName }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [newPost, setNewPost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post[body]", body);
    if (newPost) {
      formData.append("post[photo]", newPost);
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const post = await response.json();
      setBody("");
      setNewPost(null);
      setNewPost(post);
    }
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };
  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setNewPost(file);
  };

  // console.log(newPost);
  return (
    <Modal>
      <div className="postModalWrapper">
        <h2 className="sharedHeader">
          <button className="btnShared">
            <div className="icon">
              <i className="fa-solid fa-user-circle fa-3x" />
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
