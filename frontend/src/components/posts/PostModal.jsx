import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  fetchPost,
  createPost,
  updatePost,
} from "../../store/reducers/post";
// import Modal from "../Modal/modal";
// import { hideModal } from "../../store/reducers/modals";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import "./PostModal.css";

const PostModal = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(selectPost(postId));
  const [body, setBody] = useState(post?.body || "");

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (postId && post) {
      setBody(post.body);
    }
  }, [postId, post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postId) {
      dispatch(updatePost({ id: postId, body }));
    } else {
      dispatch(createPost({ body }));
    }
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal>
      <div className="postModalWrapper">
        <h2 className="sharedHeader">
          <button className="btnShared">
            <div className="icon">
              <i className="fa-solid fa-user-circle fa-3x" />
              <span>Name</span>
            </div>
          </button>
        </h2>
        <div className="sharedBody">
          <form onSubmit={handleSubmit}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
            />
            <div className="footer">
              <button className={body ? "active" : ""}>
                {postId ? "Save" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
