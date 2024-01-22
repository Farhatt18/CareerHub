import { useState } from "react";
import { createComment } from "../../store/reducers/comment";
import { useDispatch } from "react-redux";

const CreateComment = ({ postId }) => {
  // const user = useSelector((state) => state.session.user);
  // const post = useSelector((state) => state.comments.postId);
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);

  const handleCreateComment = (e) => {
    e.preventDefault();
    // if (user.id !== postUserId) {
    console.log("Creating comment with postId:", postId, "body:", body);

    dispatch(createComment(postId, body));
    // }
  };
  return (
    <div className="createCommentForm">
      <button onClick={() => setShow(true)}>Comment</button>
      {show && (
        <form>
          <input
            value={body}
            placeholder="Add a comment..."
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit" onClick={handleCreateComment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateComment;
