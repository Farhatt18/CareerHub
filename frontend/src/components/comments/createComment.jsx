import { useState } from "react";
import { createComment } from "../../store/reducers/comment";
import { useDispatch } from "react-redux";
import "./createComment.css";

const CreateComment = ({
  postId,
  postUserId,
  parentCommentId,
  onAddComments,
}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleCreateComment = (e) => {
    e.preventDefault();

    onAddComments(body);
    dispatch(createComment(postId, postUserId, body, parentCommentId));
    setBody("");
  };
  return (
    <div className="commentForm">
      <i className="fa-solid fa-user-circle fa-2x" />
      <form>
        <input
          value={body}
          placeholder="Add a comment..."
          onChange={(e) => setBody(e.target.value)}
        />
        {body && <button onClick={handleCreateComment}>Post</button>}
      </form>
    </div>
  );
};

export default CreateComment;
