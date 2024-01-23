import { useState } from "react";
import { createComment } from "../../store/reducers/comment";
import { useDispatch } from "react-redux";

const CreateComment = ({ postId, postUserId, onAddComments }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);

  const handleCreateComment = (e) => {
    e.preventDefault();

    onAddComments(body);
    dispatch(createComment(postId, postUserId, body));
    setBody("");
  };
  return (
    <div className="commentForm">
      <button onClick={() => setShow(true)}>Comment</button>
      {show && (
        <form>
          <input
            value={body}
            placeholder="Add a comment..."
            onChange={(e) => setBody(e.target.value)}
          />
          {body && <button onClick={handleCreateComment}>Post</button>}
        </form>
      )}
    </div>
  );
};

export default CreateComment;
