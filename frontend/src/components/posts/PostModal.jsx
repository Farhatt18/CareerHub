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

const PostModal = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(selectPost(postId));
  const [body, setBody] = useState("");

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
      dispatch(updatePost({ id: postId, ...body }));
    } else {
      dispatch(createPost({ body }));
    }
    // history.push("/posts");
    dispatch(modalActions.hideModal());
  };

  return (
    <div className="post-modal">
      <div className="modal-content">
        <button
          className="close"
          onClick={() => dispatch(modalActions.hideModal())}
        >
          X
        </button>
        {/* <h2>{postId ? "Update Post" : "Start a Post"}</h2> */}
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
          />
          <div className="footer">
            <button className={body ? "active" : ""}>
              {postId ? "Update Post" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
