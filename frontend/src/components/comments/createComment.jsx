import { useState } from "react";
import { createComment } from "../../store/reducers/comment";
import { useDispatch, useSelector } from "react-redux";
import "./createComment.css";

const CreateComment = ({ postId, parentCommentId, onAddComments }) => {
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleCreateComment = (e) => {
    e.preventDefault();
    onAddComments(body);
    dispatch(createComment(postId, userId, body, parentCommentId));
    setBody("");
  };
  return (
    <div className="commentForm">
      <form>
        <div className="commentForm">
          <i className="fa-solid fa-user-circle fa-2x" />

          <input
            value={body}
            placeholder="Add a comment..."
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        {body && <button onClick={handleCreateComment}>Post</button>}
      </form>
    </div>
  );
};

export default CreateComment;
